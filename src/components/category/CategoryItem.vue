<template>
  <div class="category">
    <div style="padding-top: 10px">
      <div :class="active ==='1001001'?'item active':'item'">
        <el-link href="/category/1001001" :underline="false">
          <img class="img" src="@assets/top200.png"/>
        </el-link>
      </div>
      <div :class="active ==='2001002'?'item active':'item'">
        <el-link href="/category/2001002" :underline=" false">
          <img class="img" src="@assets/top_200.png"/>
        </el-link>
      </div>
      <div :class="active ==='3001003'?'item active':'item'">
        <el-link href="/category/3001003" :underline="false">
          <img class="img" src="@assets/top_50.png"/>
        </el-link>
      </div>
      <div :class="active ==='4001004'?'item active':'item'">
        <el-link href="/category/4001004" :underline="false">
          <img class="img" src="@assets/top50.png"/>
        </el-link>
      </div>
      <div v-for="item in list" :class="active === item.val?'item active':'item'">
        <el-link :href="'/category/'+item.val" style="font-size: 18px" :underline="false">
          <div style="width: 100%;height: 100%;">
            {{ item.name }}
          </div>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import api from "@/request/api.js";

const route = useRoute()
const router = useRouter()

const active = ref('')
watch(() => route, () => {
  active.value = route.params.id
}, {
  immediate: true,
  deep: true
})

const list = ref([])
onMounted(() => {
  api.category().then((res) => {
    if (res.code === 200) {
      list.value = res.data
    }
  })
})
</script>

<style scoped>

.category {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  top: 0;
  left: 0;
  bottom: 0;
}

.category::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.item {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  padding: 0 15px;
}

.img {
  height: 32px;
  width: 100%;
}

.active {
  background-color: rgba(107, 106, 106, 0.3);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
</style>
