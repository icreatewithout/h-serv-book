<template>
  <div
      style="display: flex;flex-direction:column;justify-content: center;align-items: center;text-align: center;margin: auto">
    <span style="padding-top: 10%;font-size: 28px;font-weight: bold">每日读书APP</span>
    <img style="padding-top: 20px" src="@assets/img.png"/>
    <span style="padding-top: 20px;font-size: 18px">海量书籍小说免费读</span>
    <span style="padding-top: 5px;font-size: 14px">每天阅读每天好心情</span>
    <div style="padding: 5px 20px;background-color: skyblue;border-radius: 8px;margin-top: 20px">
      <a href="javascript:void(0)" @click="download" style="color:white;font-size: 14px">下载</a>
<!--      <a :href="url" style="color:white;font-size: 14px">下载</a>-->
    </div>
  </div>
</template>

<script setup>

import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import api from "@/request/api.js";

const route = useRoute()
const router = useRouter()

const uuid = ref('')
const app = ref('')
const url = ref('')
watch(() => route, () => {
  uuid.value = route.query.uuid
  app.value = route.query.app
  url.value = api.downApp(uuid.value, app.value)
}, {
  immediate: true,
  deep: true
})


const download = () => {
  // 创建a标签进行下载
  const link = document.createElement('a')
  link.target="_blank"
  link.href = url.value
  link.download = 'erdb.app';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>

</style>
