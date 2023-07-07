<template>
  <el-dialog v-model="open" :show-close="false" :lock-scroll="true"
             style="background-color: rgba(107, 106, 106, 0.2);height: 100vh"
             :fullscreen="true"
             class="drawer_box">
    <template #header>
      <div style="padding: 0;height: 0;">
        <div style="position: fixed;right: 10px;top: 10px"></div>
      </div>
    </template>
    <div class="container" style="display:grid;height: 100vh;width: 100%;">
      <el-card class="cata_box-card">
        <div class="ddf">
          <div
              style="width: 100%;display: flex;align-items: center;justify-content: center;padding-top: 80px;font-size: 22px">
            下载App获取更好的阅读体验
          </div>
          <div style="margin: auto; height: 300px;display: flex;justify-content: space-between;">
            <div class="qr_view">
              <el-card class="qr_box">
                <el-image style="height: 100px;width: 100px;border-radius: 6px"></el-image>
              </el-card>
              <div style="font-size: 14px;padding: 20px">
                iOS（未上架）
              </div>
            </div>
            <div class="qr_view">
              <el-card class="qr_box">
                <el-image style="height: 100px;width: 100px;border-radius: 4px" :src="qrData.imageBase64"></el-image>
              </el-card>
              <div style="font-size: 14px;padding: 20px">
                Android
              </div>
            </div>
          </div>
        </div>
        <el-button type="info" circle icon="CloseBold" @click="cancel"
                   style="height: 20px;width: 20px;right: 10px;top: 10px;position: absolute"/>
      </el-card>
    </div>
  </el-dialog>

</template>

<script setup>
import {onMounted, ref} from "vue";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import {useAuthStore} from "@store/useAuthStore.js";

const open = ref(false)

const qrData = ref({
  'uuid': '',
  'imageBase64': ''
})
const openView = () => {
  open.value = true
  api.appQr().then((res) => {
    if (res.code === 200) {
      qrData.value = res.data
    }
  })
}
const cancel = () => {
  open.value = false
}


defineExpose({
  openView
})
</script>

<style scoped>
.cata_box-card {
  margin: auto;
  width: 616px;
  height: 413px;
  border-radius: 10px;
  border: none;
  position: relative;
}

.ddf {
  display: grid;
  justify-content: center;
  align-items: center;
}

.qr_view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 240px;
  align-items: center;
}

.qr_box {
  padding: 15px;
  border-radius: 10px;
  border: none;
}

.qr_box:hover {
  background-color: rgba(107, 106, 106, 0.2);
}
</style>
<style>
.cata_box-card .ep-card__body {
  padding: 0;
  display: grid;
  height: 100%;
  width: 100%;
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
