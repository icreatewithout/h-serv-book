<template>
  <div v-if="list.length>0" style="height: 422px;padding-top: 20px">
    <div style="padding: 20px 0;display: flex;justify-content: space-between">
      <div style="font-size: 20px;font-weight: 500;">猜你喜欢</div>
      <div style="display: flex;align-items: center;">
        <el-link type="info" style="font-size: 18px" :underline="false" @click="change">换一批</el-link>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="6" v-for="item in list">
        <a :href="'/detail/'+item.id" :underline="false">
          <el-card class="card_box">
            <el-image class="img" :src="item.cover"/>
            <div style="width: 100%;padding: 10px;display: flex;justify-content: center;">
              <el-link class="name" :underline="false">{{ item.name }}</el-link>
            </div>
            <div>
              <el-link type="info" :underline="false">{{ item.author }}</el-link>
            </div>
            <div class="des">
            </div>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import api from "@/request/api.js";

onMounted(() => {
  load()
})

const list = ref([])
const load = () => {
  api.homeRand({}).then((res) => {
    if (res.code === 200) {
      list.value = res.data
    }
  })
}

const change = () => {
  load()
}
</script>

<style scoped>
.card_box {
  height: 352px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
}

.card_box:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

.img {
  height: 139px;
  width: 96px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
}

.des {
  display: grid;
  align-items: center;
  padding: 0 10px 0 20px;
  font-size: 15px;
}

.name {
  font-size: 16px;
  padding-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
<style>
.card_box .ep-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
