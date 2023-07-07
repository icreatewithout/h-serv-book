<template>
  <el-dialog v-model="drawer" :show-close="false" :lock-scroll="true"
             style="background-color: rgba(107, 106, 106, 0.2);"
             :fullscreen="true"
             class="drawer_box">
    <template #header>
      <div style="height: 0;padding: 0"></div>
    </template>
    <div class="container">
      <el-card class="cata_box-card">
        <div style="height: 50px;padding: 10px 30px;display: flex;align-items: center">
          <el-input
              v-model="value"
              class="w-50"
              size="large"
              placeholder="搜索"
              @keyup.enter="search"
              clearable
              @clear="search"
              prefix-icon="search">
          </el-input>
          <el-button type="info" circle icon="close" @click="cancel"/>
        </div>
        <ul v-infinite-scroll="load" class="infinite-list">
          <a :href="'/content/'+item.id" v-for="item in list">
            <el-card class="cata_box-card1" shadow="never">
              {{ item.name }}
            </el-card>
          </a>
        </ul>
      </el-card>
    </div>
  </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import api from "@/request/api.js";
import {Close} from "@element-plus/icons-vue";

const value = ref('')
const drawer = ref(false)
const book_id = ref('')
const open = (bid) => {
  book_id.value = bid
  drawer.value = true
}
const pageNum = ref(1)
const list = ref([])
const load = () => {
  const data = {
    val: value.value,
    bid: book_id.value,
    pageNum: pageNum.value,
    pageSize: 20
  }
  api.catalog(data).then((res) => {
    if (res.code === 200) {
      const l = res.data.content
      list.value.push(...l)
      if (!res.data.empty) {
        pageNum.value = pageNum.value + 1
      }
    }
  })
}

const search = () => {
  pageNum.value = 1
  list.value = []
  load()
}

const cancel = () => {
  drawer.value = false
}

defineExpose({
  open
})
</script>

<style scoped>
.cata_box-card {
  height: 100vh;
  width: 50%;
  float: right;
  border-radius: 0;
  border: none;
}

.infinite-list {
  height: 100vh;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  margin: 0;
  padding: 0;;
}

.infinite-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.w-50 {
  border-radius: 20px;
  padding-right: 20px;
}

.cata_box-card1 {
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 18px 30px;
}

.cata_box-card1:hover {
  background-color: rgba(107, 106, 106, 0.2);
}
</style>

<style>
.cata_box-card .ep-card__body {
  padding: 0;
}

.infinite-list ul {
  list-style-type: disc;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  margin: 0;
}

.infinite-list .cata_box-card {
  padding-bottom: 10px;
}

.drawer_box .ep-dialog__header {
  padding: 0;
  margin-right: 0;
}

.drawer_box .ep-dialog__body {
  padding: 0;
}

.ep-input__wrapper {
  border-radius: 100px;
  padding-top: 20px;
}
</style>
