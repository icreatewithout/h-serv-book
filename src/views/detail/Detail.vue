<template>
  <el-affix>
    <TopHeader :show="true"/>
  </el-affix>
  <div class="container" style="position: relative">
    <el-card class="box-card">
      <BookInfo :id="id"/>
      <el-divider direction="horizontal" style="margin: 30px 0"/>
      <Recommend @refresh="refresh" :id="id"/>
    </el-card>
    <Comment ref="refComment" :id="id"/>
    <el-card class="box-card" style="margin-top: 10px;padding: 10px 80px 10px 80px">
      <el-row :gutter="30">
        <el-col :span="18">
          <el-button style="width: 100%;border-radius: 10px;height: 50px" size="large" property="info" @click="openAppQr">
            下载 App 阅读更方便
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button style="width: 100%;border-radius: 10px;height: 50px;" color="#0097ff" size="large" property="info"
                     @click="start">
            开始阅读
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <AppQr ref="refAppQr"/>
</template>

<script setup>

import TopHeader from "@components/home/TopHeader.vue";
import {ref, watch} from "vue";

import Recommend from "@components/detail/Recommend.vue";
import Comment from "@components/detail/Comment.vue";
import BookInfo from "@components/detail/BookInfo.vue";
import {useRoute, useRouter} from "vue-router";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import AppQr from "@components/home/AppQr.vue";

const route = useRoute()
const router = useRouter()

const id = ref('')
watch(() => route, () => {
  id.value = route.params.id
}, {
  immediate: true,
  deep: true
})

const start = () => {
  api.start(id.value).then((res) => {
    if (res.code === 200) {
      router.push("/content/" + res.data)
    } else {
      ElMessage.error(res.message)
    }
  }).catch((err) => ElMessage.error(err.message))
}

const refComment = ref()
const refresh = (id) => {
  refComment.value.setData(id)
}

const refAppQr = ref()
const openAppQr = () => {
  refAppQr.value.openView()
}
</script>

<style scoped>
.box-card {
  margin-top: 10px;
  border-radius: 0;
  border: none;
  padding: 50px 80px 20px 80px;
}

</style>
<style>
.ep-progress {
  margin-bottom: 10px;
  width: 100%;
}
</style>
