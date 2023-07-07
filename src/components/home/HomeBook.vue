<template>
  <el-row style="border-top: 1px solid #eeeeee;display: flex;justify-content: space-between">
    <el-col class="info" v-for="item in list" :span="11">
      <el-link :href="'/detail/'+item.id" :underline="false">
        <div>
          <el-image class="img" :src="item.cover"/>
        </div>
        <div class="des">
          <div>
            <el-link class="name" :underline="false">{{ item.name }}</el-link>
          </div>
          <div>
            <el-link type="info" :underline="false">{{ item.author }}</el-link>
          </div>
        </div>
      </el-link>
    </el-col>
  </el-row>
</template>

<script setup>
const props = defineProps({
  icon: String,
  list: Array,
})
</script>

<style scoped>

.info {
  display: flex;
  padding: 20px 0 20px 5px;
  border-bottom: 1px solid #eeeeee;
}

.info:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

.img {
  height: 92px;
  width: 64px;
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
