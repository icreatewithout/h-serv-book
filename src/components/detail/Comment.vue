<template>
  <el-card class="box-card" style="margin-top: 10px;padding: 10px 80px 10px 80px">
    <div style="margin-bottom: 20px;font-size: 18px">最新点评</div>
    <el-card class="pun" v-for="item in list">
      <div style="display: flex;align-items: center;font-size: 14px;margin-bottom: 8px">
        <div style="display:flex;align-items: center;">
          <img v-if="item.userVo.avatarUrl===null" src="@assets/avatar.png"
               style="height: 22px;width: 22px;border-radius: 100%;background-color: white"/>
          <img v-if="item.userVo.avatarUrl!==null" :src="item.userVo.avatarUrl"
               style="height: 22px;width: 22px;border-radius: 100%;background-color: white"/>
          <div style="padding-left: 5px">{{ item.userVo.nickName }}</div>
        </div>
        <div v-if="item.rate==='1'" style="display:flex;align-items: center;padding-left: 5px">
          <el-icon size="20">
            <Sunrise/>
          </el-icon>
          <div>推荐</div>
        </div>
        <div v-if="item.rate==='2'" style="display:flex;align-items: center;padding-left: 5px">
          <el-icon size="20">
            <PartlyCloudy/>
          </el-icon>
          <div>一般</div>
        </div>
        <div v-if="item.rate==='3'" style="display:flex;align-items: center;padding-left: 5px">
          <el-icon size="20">
            <Pouring/>
          </el-icon>
          <div>不行</div>
        </div>
      </div>
      <div class="txt1" v-html="item.comments"></div>
    </el-card>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-button style="width: 100%;border-radius: 10px;height: 50px" size="large" property="info" @click="loadMore">
          查看更多精彩评论
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";

const props = defineProps({
  id: String
})

const pageNum = ref(1)
const pageSize = ref(5)
const list = ref([])
onMounted(() => {
  findList()
})

const loadMore = () => {
  findList()
}

const findList = () => {
  const data = {
    bid: props.id,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }
  api.rateList(data).then((res) => {
    if (res.code === 200) {
      list.value.push(...res.data.content)
      pageNum.value = pageNum.value + 1
    }
  }).catch(err => ElMessage.error(err.message))
}

const setData = (id) => {
  api.getRate(id).then((res) => {
    if (res.code === 200) {
      list.value.unshift(res.data)
    }
  })
}

defineExpose({
  setData
})
</script>

<style scoped>

.box-card {
  margin-top: 10px;
  border-radius: 0;
  border: none;
  padding: 50px 80px 20px 80px;
}

.pun {
  border-radius: 10px;
  margin-bottom: 10px
}

.pun:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

.txt1 {
  margin: 10px 0;
  font-weight: 22;
}
</style>
