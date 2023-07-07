<template>
  <el-card class="box-card-header" shadow="never">
    <div class="container" style="position: relative;">
      <div class="header">
        <div class="img">
          <el-link href="/" :underline="false">
            <img src="@assets/img.png"/>
          </el-link>
        </div>
        <div style="position: absolute;left: 100px;display: flex;align-items: center">
          <el-link :href="'/detail/'+props.id" style="font-size: 16px" :underline="false">{{ props.name }}</el-link>
          <p style="padding: 0 10px">{{ props.catalog }}</p>
        </div>
        <div class="right">
          <el-link v-if="!status" class="txt" :underline="false" @click="openLogin">登录</el-link>
          <el-dropdown v-if="status" ref="dropdown1" trigger="click">
            <a href="javascript:void(0)">
              <img v-if="userInfo.avatarUrl===null" src="@assets/avatar.png"
                   style="width: 30px;height: 30px;border-radius: 100%;border: 1px solid #eeeeee">
              <img v-if="userInfo.avatarUrl!==null" :src="userInfo.avatarUrl"
                   style="width: 30px;height: 30px;border-radius: 100%;border: 1px solid #eeeeee">
            </a>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>{{ userInfo.nickName }}</el-dropdown-item>
                <el-dropdown-item>我的书架</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-divider direction="vertical"/>
          <el-link class="txt" :underline="false">
            <el-switch v-model="switchVal" inline-prompt active-icon="moon" inactive-icon="sunny" @change="toggleDark"/>
          </el-link>
          <el-divider direction="vertical"/>
          <el-button v-if="!shelf" icon="reading" type="info" size="small" class="btn" @click="addShelf">加入书架</el-button>
          <el-button v-if="shelf" icon="reading" type="success" size="small"  class="btn">已加入</el-button>
        </div>
      </div>
    </div>
  </el-card>
  <el-divider class="divider"/>
  <LoginQr ref="refLoginQr"/>
</template>

<script setup>
import {computed, ref} from "vue";
import {useDark, useToggle} from "@vueuse/core";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import LoginQr from "@components/home/LoginQr.vue";
import {useAuthStore} from "@store/useAuthStore.js";
const emits = defineEmits(['changeShelf'])
const props = defineProps({
  id: String,
  name: String,
  catalog: String,
  shelf: Boolean,
})
const isDark = useDark();
const toggleDark = useToggle(isDark);
const switchVal = ref(isDark.value)

const refLoginQr = ref()

const openLogin = () => {
  refLoginQr.value.openView()
}

const addShelf = () => {
  api.addShelf(props.id).then((res) => {
    if (res.code === 200) {
      ElMessage.success("已完成")
      emits('changeShelf', true)
    } else {
      ElMessage.error(res.message)
    }
  }).catch((err) => {
    if (err.code === 401) {
      refLoginQr.value.openView()
    } else {
      ElMessage.error(err.message)
    }
  })
}

const status = computed(() => useAuthStore().getLogin);
const uid = computed(() => useAuthStore().getId);
const userInfo = computed(() => useAuthStore().getInfo);
const dropdown1 = ref()
</script>

<style scoped>
.box-card-header {
  border: none;
  border-radius: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  align-items: center;
}

.img {
  display: flex;
  align-items: center;
  flex: 1;
}

.img img {
  width: 32px;
  height: 32px;
  border-radius: 6px;

}

.img span {
  padding-left: 10px;
  font-size: 18px;
  font-weight: bolder;
}

.divider {
  margin: 0;
}

.right {
  flex: 3;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

}

.right .txt {
  font-size: 16px;
  padding: 0 10px;
}

.right .txt:first-child {
  padding-right: 0;
}

.divider {
  margin: 0;
}

.btn{
  border-radius: 20px;
}
</style>
<style>
.box-card-header .ep-card__body {
  padding: 0;
}
</style>
