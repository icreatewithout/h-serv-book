<template>
  <el-dialog v-model="open" :show-close="false" :lock-scroll="true"
             style="background-color: rgba(107, 106, 106, 0.2);height: 100vh"
             :fullscreen="true"
             class="drawer_box">
    <template #header>
      <div style="padding: 0;height: 0;">
        <div style="position: fixed;right: 10px;top: 10px">

        </div>
      </div>
    </template>
    <div class="container" style="display:grid;height: 100vh;width: 100%;">
      <el-card class="cata_box-card">
        <div v-if="type===1" class="ddf">
          <div
              style="margin: auto; height: 200px;display: flex;flex-direction:column;justify-content: center;align-items: center">
            <el-image style="height: 180px;width: 180px" @click="refresh"
                      :src="qrData.imageBase64"></el-image>
            <div style="width: 100%;text-align: center;font-size: 20px;justify-content: center">
              扫码登录随时阅读
            </div>
          </div>
        </div>
        <div v-if="type===2" class="login">
          <el-form style="width: 220px" ref="loginRef" :rules="rules" :model="form" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="form.username" size="large" placeholder="用户名"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" size="large" placeholder="密码" type="password"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" style="width: 220px;margin: auto" @click="login">登录
              </el-button>
            </el-form-item>
            <el-form>
              <span style="font-size: 12px;color: grey">提示：首次登录会自动创建账号，注意保存密码，账号不记名，丢失无法找回！</span>
            </el-form>
          </el-form>
        </div>
        <el-button type="info" circle icon="CloseBold" @click="cancel"
                   style="height: 20px;width: 20px;right: 10px;top: 10px;position: absolute"/>
        <div v-if="type===1" style="position: absolute;bottom: 0;right: 0" class="sjdd" @click="loginByAccount"></div>
        <div v-if="type===2" style="position: absolute;bottom: 0;right: 0" class="sjdd1" @click="loginByAccount"></div>
      </el-card>
    </div>
  </el-dialog>

</template>

<script setup>
import {onMounted, ref} from "vue";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import {useAuthStore} from "@store/useAuthStore.js";

let timer;
let i = 0;
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const type = ref(1)
const open = ref(false)
const qrData = ref({
  'uuid': '',
  'imageBase64': ''
})

const openView = () => {
  open.value = true
  if (type.value === 1) {
    api.getQr().then((res) => {
      if (res.code === 200) {
        qrData.value = res.data
        ckLogin()
      }
    })
  }
}
const cancel = () => {
  open.value = false
  clearInterval(timer)
}

const ckLogin = () => {
  console.log(i)
  timer = setInterval(async () => {
    if (i > 30) {
      clearInterval(timer);
      refresh()
    }
    try {
      const res = await api.qrLogin(qrData.value.uuid)
      if (res.code === 200) {
        useAuthStore().auth(res).then(() => {
          cancel()
        })
      }
    } catch (err) {
      if (err.code === 100) {
        i++
      } else {
        refresh()
        ElMessage.error('登录失败')
      }
    }
  }, 3000)
}


const refresh = () => {
  api.getQr().then((res) => {
    if (res.code === 200) {
      qrData.value = res.data
      i = 0
      ckLogin()
    }
  })
}

const loginByAccount = () => {
  if (type.value === 1) {
    type.value = 2
    clearInterval(timer)
  } else {
    type.value = 1
    i = 0;
    clearInterval(timer)
    refresh()
  }
}

const form = ref({
  username: '',
  password: ''
})

const loginRef = ref()
const loading = ref(false)

const rules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 4, max: 10, message: '长度范围4-10', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 18, message: '长度范围6-18', trigger: 'blur'},
  ],
})
const login = () => {
  loginRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      api.login(form.value).then((res) => {
        if (res.code === 200) {
          useAuthStore().auth(res).then(() => {
            loading.value = false
            cancel()
          })
        }
      }).catch(err => {
        ElMessage.error(err.message)
        loading.value = false
      })
    }
  })

}

defineExpose({
  openView
})
</script>

<style scoped>
.cata_box-card {
  margin: auto;
  width: 280px;
  height: 317px;
  border-radius: 10px;
  border: none;
  position: relative;
}

.ddf {
  display: grid;
  justify-content: center;
  align-items: center;
}


.login {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.sjdd::before {
  content: "";
  width: 0;
  height: 0;
  border: 40px solid transparent;
  border-right: 40px solid #e3e3e3;
  transform: rotate(-135deg);
  position: absolute;
  right: -41px;
  bottom: -41px;
  cursor: pointer;
}

.sjdd::after {
  content: "账号";
  font-size: 13px;
  width: 30px;
  height: 30px;
  color: #7e7e7e;
  transform: rotate(315deg);
  position: absolute;
  right: -4px;
  bottom: -2px;
  cursor: pointer;
}


.sjdd1::before {
  content: "";
  width: 0;
  height: 0;
  border: 40px solid transparent;
  border-right: 40px solid #e3e3e3;
  transform: rotate(-135deg);
  position: absolute;
  right: -41px;
  bottom: -41px;
  cursor: pointer;
}

.sjdd1::after {
  content: "扫码";
  font-size: 13px;
  width: 30px;
  height: 30px;
  color: #7e7e7e;
  transform: rotate(315deg);
  position: absolute;
  right: -4px;
  bottom: -2px;
  cursor: pointer;
}

</style>
<style>
.cata_box-card .ep-card__body {
  padding: 0;
  display: grid;
  height: 100%;
  width: 100%;
}

.infinite-list ul {
  list-style-type: disc;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  margin: 0;
}

.infinite-list .cata_box-card {
  padding-bottom: 10px;
}

.drawer_box .ep-dialog__header {
  padding: 0;
  margin-right: 0;
}

.drawer_box .ep-dialog__body {
  padding: 0;
}

.login .ep-input__wrapper {
  border-radius: 100px;
}
</style>
