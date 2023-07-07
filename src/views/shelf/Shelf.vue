<template>
  <el-affix>
    <TopHeader :show="true"/>
  </el-affix>
  <div class="container" style="position: relative">
    <div style="padding: 60px 0 40px  0;display: flex;justify-content: space-between">
      <div style="display: flex;flex-direction: column;">
        <span v-if="userInfo" style="padding: 10px 0;font-size: 24px">{{ userInfo.nickName }}</span>
        <span style="color: grey">当前书架有{{ list.length }}本书</span>
      </div>
      <div style="display: flex;flex-direction: column-reverse;color: grey;">
        <el-button type="info" style="border-radius: 20px;padding: 0 20px;font-size: 12px" @click="openAppQr">
          下载每日阅读App管理书架
        </el-button>
      </div>
    </div>
    <el-row :gutter="30">
      <el-col :span="4" v-for="item in list">
        <a :href="'/content/'+item.cid">
          <el-card class="cata_box-card" shadow="never">
            <el-image class="img" fit="cover" :src="item.bookVo.cover"/>
            <div class="name">{{ item.bookVo.name }}</div>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </div>
  <LoginQr ref="refLoginQr"/>
  <AppQr ref="refAppQr"/>
</template>

<script setup>
import TopHeader from "@components/home/TopHeader.vue";
import {computed, onMounted, ref} from "vue";
import {useAuthStore} from "@store/useAuthStore.js";
import api from "@/request/api.js";
import LoginQr from "@components/home/LoginQr.vue";
import AppQr from "@components/home/AppQr.vue";

const refLoginQr = ref()
const userInfo = computed(() => useAuthStore().getInfo);

onMounted(() => {
  load()
})

const list = ref([])
const load = () => {
  api.shelfList({}).then((res) => {
    if (res.code === 200) {
      list.value = res.data
    }
  }).catch(err => {
    if (err.code === 401) {
      refLoginQr.value.openView()
    }
  })
}

const refAppQr = ref()
const openAppQr = () => {
  refAppQr.value.openView()
}
</script>

<style scoped>

.cata_box-card {
  display: flex;
  flex-direction: column;
  border: none;
  margin-bottom: 10px;
}

.img {
  height: 185px;
}

.name {
  padding: 14px 0;

}

.infinite-list {
  height: calc(100vh - 72px);
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  margin: 0;
  padding: 0;;
}

.infinite-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
