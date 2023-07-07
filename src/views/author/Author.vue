<template>
  <el-affix>
    <TopHeader :show="true"/>
  </el-affix>
  <div class="container" style="position: relative">
    <div style="padding: 60px 0 40px  0;display: flex;justify-content: space-between">
      <div style="display: flex;flex-direction: column;">
        <span style="padding: 10px 0;font-size: 24px">作者 {{ name }}</span>
        <span style="color: grey">当前作者{{ count }}共有本书</span>
      </div>
      <div style="display: flex;flex-direction: column-reverse;color: grey;">
        <el-button type="info" style="border-radius: 20px;padding: 0 20px;font-size: 12px" @click="openAppQr">下载每日阅读App快乐阅读</el-button>
      </div>
    </div>
    <el-divider />
    <el-card class="auth_list dd" shadow="never" v-for="item in list">
      <el-link :href="'/detail/'+item.id" :underline="false">
        <div>
          <el-image class="img1" :src="item.cover"/>
        </div>
        <div class="des1">
          <div>
            <el-link style="font-size: 16px;" :underline="false">{{ item.name }}</el-link>
          </div>
          <div style="padding: 2px 0;color: grey">
            {{ item.author }}
          </div>
          <div class="txt1">
            {{ item.des }}
          </div>
        </div>
      </el-link>
    </el-card>
  </div>
  <AppQr ref="refAppQr"/>
</template>

<script setup>
import TopHeader from "@components/home/TopHeader.vue";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import api from "@/request/api.js";
import AppQr from "@components/home/AppQr.vue";


const route = useRoute()
const router = useRouter()

const name = ref('')
// watch(() => route, () => {
//   name.value = route.params.name
// }, {
//   immediate: true,
//   deep: true
// })

onMounted(() => {
  name.value = route.params.name
  findList()
})

const list = ref([])
const count = ref(0)
const findList = () => {
  const data = {
    name: name.value
  }
  api.searchAuthorBook(data).then((res) => {
    if (res.code === 200) {
      count.value = res.data.count
      list.value = res.data.list
    }
  })
}

const refAppQr = ref()
const openAppQr = () => {
  refAppQr.value.openView()
}
</script>

<style scoped>
.auth_list {
  border: none;
  padding: 20px 0;
}

.dd {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 24px;
  display: flex;
  align-items: center;
}

.auth_list:last-child {
  border-bottom: none;
}

.auth_list:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

.img1 {
  height: 156px;
  width: 108px;
  border-radius: 2px;
}

.des1 {
  display: grid;
  align-items: center;
  padding: 0 10px 0 50px;
  font-size: 15px;
}

.txt1 {
  margin: 10px 0;
  font-size: 14px;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
