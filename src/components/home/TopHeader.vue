<template>
  <el-card class="box-card-header" shadow="never">
    <div class="container">
      <div class="header">
        <div class="img">
          <el-link href="/" :underline="false">
            <img src="@assets/img.png"/>
            <span>每日读书</span>
          </el-link>
        </div>
        <div v-if="show" class="search" @click="focus">
          <el-input
              v-model="value"
              class="w-50"
              size="large"
              placeholder="搜索"
              prefix-icon="search"
              readonly
          />
        </div>
        <div class="right">
          <Menu/>
        </div>
      </div>
    </div>
  </el-card>
  <el-divider class="divider"/>
  <Search ref="refSearch"/>
</template>

<script setup>
import {ref} from "vue";
import {useDark, useToggle} from "@vueuse/core";
import Menu from "@components/home/Menu.vue";
import Search from "@components/search/Search.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
})
const value = ref('')
const refSearch = ref()
const focus = () => {
  refSearch.value.open()
}
</script>

<style scoped>

.box-card-header {
  border: none;
  border-radius: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  align-items: center;
}

.img {
  display: flex;
  align-items: center;
  flex: 1;
}

.img img {
  width: 32px;
  height: 32px;
  border-radius: 6px;

}

.img span {
  padding-left: 10px;
  font-size: 18px;
  font-weight: bolder;
}

.search {
  flex: 2;
}

.w-50 {
  border-radius: 20px;
}

.divider {
  margin: 0;
}

.right {
  flex: 3;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
</style>

<style>
.search .ep-input__wrapper {
  border-radius: 100px;
}

.box-card-header .ep-card__body {
  padding: 0;
}
</style>
