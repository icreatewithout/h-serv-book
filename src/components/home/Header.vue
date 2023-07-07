<template>
  <div class="container">
    <div class="header">
      <div class="header_img">
        <img src="@assets/img.png"/>
        <span>每日读书</span>
      </div>
      <div class="right">
        <Menu/>
      </div>
    </div>
    <div class="img">
      <div class="icon">
        <img src="@assets/ad.png"/>
        <span>让每个人都可以轻松阅读</span>
      </div>
      <el-input
          v-model="value"
          class="w-50"
          size="large"
          placeholder="搜索"
          prefix-icon="search"
          readonly
          @click="focus"
      />
    </div>
  </div>
  <Search ref="refSearch"/>
</template>

<script setup>
import {ref} from "vue";
import {useDark, useToggle} from "@vueuse/core";
import Menu from "@components/home/Menu.vue";
import Search from "@components/search/Search.vue";
import LoginQr from "@components/home/LoginQr.vue";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";

const value = ref('')
const refSearch = ref()

const focus = () => {
  refSearch.value.open()
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  align-items: center;
}

.header_img {
  display: flex;
  align-items: center;
}

.header_img img {
  height: 32px;
  width: 32px;
  border-radius: 5px;
}

.header_img span {
  padding-left: 10px;
  font-size: 18px;
  font-weight: bolder;
}

.img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
}

.img .icon {
  display: flex;
  align-items: center;
  padding: 40px;
}

.img .icon img {
  width: 30px;
  height: 30px;
  border-radius: 6px;
}

.img span {
  padding-left: 15px;
  font-size: 22px;
}


.w-50 {
  border-radius: 100px;
  height: 50px;
  width: 700px;
}

.right {
  flex: 3;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

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

<style>
.img .ep-input__wrapper {
  border-radius: 100px;
}
</style>
