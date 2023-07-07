<template>
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
        <el-dropdown-item>
          <el-link href="/shelf" :underline="false">我的书架</el-link>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--  <el-link v-if="status" class="txt" :underline="false" @click="openLogin">{{ userInfo.nickName }}</el-link>-->
  <el-divider direction="vertical"/>
  <el-link class="txt" :underline="false">
    <el-switch v-model="switchVal" inline-prompt active-icon="moon" inactive-icon="sunny" @change="toggleDark"/>
  </el-link>
  <el-divider direction="vertical"/>
  <el-link class="txt" :underline="false" @click="openAppQr">手机阅读</el-link>
  <el-divider direction="vertical"/>
  <el-link class="txt" :underline="false" @click="openAppQr">书圈儿</el-link>
  <LoginQr ref="refLoginQr"/>
  <AppQr ref="refAppQr"/>
</template>

<script setup>
import {computed, h, ref} from "vue";
import {useDark, useToggle} from "@vueuse/core";
import LoginQr from "@components/home/LoginQr.vue";
import {useAuthStore} from "@store/useAuthStore.js";
import {ElAlert, ElMessage, ElMessageBox, ElNotification} from "element-plus";
import AppQr from "@components/home/AppQr.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const switchVal = ref(isDark.value)

const refLoginQr = ref()
const openLogin = () => {
  refLoginQr.value.openView()
}

const status = computed(() => useAuthStore().getLogin);
const uid = computed(() => useAuthStore().getId);
const userInfo = computed(() => useAuthStore().getInfo);
const dropdown1 = ref()

const logout = () => {
  useAuthStore().logout().then((res) => {
    if (res.code === 200) {
      ElMessage.success("已退出登录")
    } else {
      ElMessage.success(res.message)
    }

  })
}

const refAppQr = ref()
const openAppQr = () => {
  refAppQr.value.openView()
}

const show = () => {
  ElNotification({
    title: '提示',
    message: h('i', { style: 'color: teal' }, '功能暂未上线'),
  })
}
</script>

<style scoped>
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
</style>
