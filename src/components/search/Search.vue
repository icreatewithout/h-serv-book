<template>
  <el-dialog
      v-model="drawer" :show-close="false" :lock-scroll="true"
      style="background-color: rgba(107, 106, 106, 0.9);" :fullscreen="true"
      class="drawer_box">
    <template #header>
      <div style="padding: 0;height: 0;">
        <div style="position: fixed;right: 10px;top: 10px">
          <el-button type="info" circle icon="close" @click="cancel" style="height: 28px;width: 28px"/>
        </div>
      </div>
    </template>
    <ul v-infinite-scroll="load" class="infinite-list">
      <div class="container" style="width: 700px;position: relative">
        <div class="header">
          <div class="icon">
            <img src="@assets/img.png"/>
            <el-text class="span_txt" type="info">每日读书</el-text>
          </div>
          <el-affix>
            <el-input
                v-model="value"
                class="w-501"
                size="large"
                :autofocus="true"
                placeholder="搜索"
                @keyup.enter="search"
            >
              <template #prefix>
                <el-icon size="20">
                  <Search/>
                </el-icon>
              </template>
              <template #suffix>
                <el-button type="primary" circle style="height: 30px;width: 30px" @click="search">
                  <el-icon size="20"><Select/></el-icon>
                </el-button>
              </template>
            </el-input>
          </el-affix>
        </div>
        <el-card class="cata_box_search" shadow="never">
          <el-card class="auth_list" shadow="never" v-for="item in author">
            <a :href="'/author/'+item.author">
              <div style="padding: 0 20px;height: 52px;display: flex;align-items: center">
                <img style="height: 40px;width: 40px" src="@assets/avatar1.png"/>
                <div style="display: flex;flex-direction: column;padding-left: 10px">
                  <div>{{ item.author }}</div>
                  <el-text>该作者共有{{ item.count }}本书</el-text>
                </div>
              </div>
            </a>
          </el-card>
        </el-card>
        <el-card class="cata_box_search" shadow="never" style="margin-top: 40px;">
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
        </el-card>
      </div>
    </ul>
  </el-dialog>

</template>

<script setup>
import {ref} from 'vue'
import api from "@/request/api.js";

const drawer = ref(false)

const open = () => {
  drawer.value = true
}

const value = ref('')


const cancel = () => {
  drawer.value = false
}

const author = ref([])
const list = ref([])
const showBook = ref(false)
const pageNum = ref(1)
const pageSize = ref(10)
const search = () => {
  list.value = []
  pageNum.value = 1
  const data = {
    searchVal: value.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }
  api.searchAuthor(data).then((res) => {
    if (res.code === 200) {
      author.value = res.data
    }
  })
  if (showBook) {
    load()
  }
}

const sb = (data) => {
  api.searchBook(data).then((res) => {
    if (res.code === 200) {
      showBook.value = true
      list.value.push(...res.data.content)
      if (!res.data.empty) {
        pageNum.value = pageNum.value + 1
      }
    }
  })
}

const load = () => {
  const data = {
    searchVal: value.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }
  sb(data)
}

defineExpose({
  open
})
</script>

<style scoped>

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  margin-top: 70px;
}

.header .icon {
  display: flex;
  align-items: center;
  padding: 40px;
}

.header .icon img {
  width: 34px;
  height: 34px;
  border-radius: 6px;
}

.header .span_txt {
  padding-left: 15px;
  font-size: 26px;
  font-weight: bolder;
}

.w-501 {
  border-radius: 100px;
  height: 50px;
  width: 700px;
}

.cata_box_search {
  width: 100%;
  border-radius: 14px;
  border: none;
}


.auth_list {
  border-top: none;
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


.img1 {
  height: 103px;
  width: 72px;
  border-radius: 2px;
}

.des1 {
  display: grid;
  align-items: center;
  padding: 0 10px 0 20px;
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

<style>
.cata_box_search .ep-card__body {
  padding: 0;
  width: 100%;
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

.w-501 .ep-input__wrapper {
  border-radius: 100px;
}
</style>

