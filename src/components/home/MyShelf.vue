<template>
  <div v-if="list.length>0" style="height: 240px;padding-top: 20px">
    <div style="padding: 20px 0;display: flex;justify-content: space-between">
      <div style="font-size: 20px;font-weight: 500;">我的书架</div>
      <div style="display: flex;align-items: center;">
        <el-link type="info" href="/shelf" style="font-size: 15px" :underline="false">查看我的书架</el-link>
        <el-icon size="14">
          <ArrowRight/>
        </el-icon>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item,index) in list">
        <el-card v-if="index < 4" class="card_box">
          <el-link :href="'/content/'+item.cid" :underline="false">
            <div>
              <el-image class="img" :src="item.bookVo.cover"/>
            </div>
            <div class="des">
              <div>
                <el-link class="name" :underline="false">{{ item.bookVo.name }}</el-link>
              </div>
              <div>
                <el-link type="info" :underline="false">{{ item.bookVo.author }}</el-link>
              </div>
            </div>
          </el-link>
        </el-card>
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
  api.shelfList({}).then((res) => {
    if (res.code === 200) {
      list.value = res.data
    }
  })
}
</script>

<style scoped>
.card_box {
  height: 170px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 12px;
}

.card_box:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

.img {
  height: 121px;
  width: 84px;
  border-radius: 2px;
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
  -webkit-line-clamp: 2;
}
</style>
