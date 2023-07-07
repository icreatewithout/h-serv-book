<template>
  <TopHeader :show="true"/>
  <div class="container">
    <div class="el_view">
      <div class="aside">
        <CategoryItem />
      </div>
      <el-divider class="vertical" direction="vertical"/>
      <div class="right">
        <div class="list">
<!--          <div style="padding: 0 76px;height: 66px;display: flex;align-items: center">-->
<!--            份额名-->
<!--          </div>-->
<!--          <el-divider style="width: 100%;margin: 0" direction="horizontal"/>-->
          <CategoryBook/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import TopHeader from "@components/home/TopHeader.vue";
import CategoryItem from "@components/category/CategoryItem.vue";
import CategoryBook from "@components/category/CategoryBook.vue";
</script>

<style scoped>

.el_view {
  display: flex;
  width: 100%;
}

.aside {
  display: flex;
  position: relative;
  width: 250px;
  height: calc(100vh - 72px);
}

.vertical {
  margin: 0;
  height: calc(100vh - 72px);
}

.right {
  position: relative;
  width: 100%;
  height: calc(100vh - 72px);
}

.list {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;

}

</style>
