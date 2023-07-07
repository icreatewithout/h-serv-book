<template>
  <ul v-infinite-scroll="loadMore" class="infinite-list"
      :infinite-scroll-immediate="true">
    <el-row>
      <el-col class="list_item" v-for="(item,index) in list">
        <el-link :href="'/detail/'+item.id" :underline="false">
          <div class="item_index">
            <p>{{ index + 1 }}</p>
          </div>
          <div>
            <el-image class="img" :src="item.cover"/>
          </div>
          <div class="des">
            <div>
              <el-link style="font-size: 16px;padding-bottom: 5px" :underline="false">{{ item.name }}</el-link>
            </div>
            <div style="padding: 5px 0;color: grey">
              {{ item.author }}
            </div>
            <div style="padding: 5px 0;color: grey;display: flex;align-items: center;">
              <div v-if="item.readCount>0">今日{{ item.readCount }}人阅读</div>
              <el-divider v-if="item.rate>0 && item.readCount>0" direction="vertical"/>
              <div v-if="item.rate>0" style="display: flex;flex-direction: row;align-items: center">
                推荐率{{ item.rate }}%
                <img v-if="item.rate<=60" style="padding-left: 10px;height: 22px" src="@assets/book/bbby60.png"/>
                <img v-if="item.rate>60 && item.rate<=70" style="padding-left: 10px;height: 22px"
                     src="@assets/book/zdyd70.png"/>
                <img v-if="item.rate>70 && item.rate<=80" style="padding-left: 10px;height: 22px"
                     src="@assets/book/kzrk80.png"/>
                <img v-if="item.rate>80 && item.rate<=85" style="padding-left: 10px;height: 22px"
                     src="@assets/book/hprc85.png"/>
                <img v-if="item.rate>85" style="padding-left: 10px;height: 22px" src="@assets/book/sz90.png"/>
              </div>
            </div>
            <div class="txt">
              {{ item.des }}
            </div>
          </div>
        </el-link>
      </el-col>
    </el-row>
  </ul>
</template>

<script setup>
import {ref, watch} from "vue";
import api from "@/request/api.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const category = ref('')
watch(() => route, () => {
  category.value = route.params.id
}, {
  immediate: true,
  deep: true
})

const list = ref([])
const pageNum = ref(1)
const loadMore = () => {
  const data = {
    cVal: category.value,
    pageNum: pageNum.value,
    pageSize: 10
  }
  if (category.value === '1001001') {
    findGreat(data)
  } else if (category.value === '2001002') {
    findTop200(data)
  } else if (category.value === '3001003') {
    findTop50(data)
  } else if (category.value === '4001004') {

  } else {
    findList(data)
  }
}

const findGreat = (data) => {
  api.homeGreat(data).then((res) => {
    if (res.code === 200) {
      const l = res.data.content
      list.value.push(...l)
      if (!res.data.empty) {
        pageNum.value = pageNum.value + 1
      }
    }
  })
}

const findTop50 = (data) => {
  api.home50(data).then((res) => {
    if (res.code === 200) {
      const l = res.data.content
      list.value.push(...l)
      if (!res.data.empty) {
        pageNum.value = pageNum.value + 1
      }
    }
  })
}

const findTop200 = (data) => {
  api.home200(data).then((res) => {
    if (res.code === 200) {
      const l = res.data.content
      list.value.push(...l)
      if (!res.data.empty) {
        pageNum.value = pageNum.value + 1
      }
    }
  })
}

const findList = (data) => {
  api.book(data).then((res) => {
    if (res.code === 200) {
      const l = res.data.content
      list.value.push(...l)
      if (!res.data.empty) {
        pageNum.value = pageNum.value + 1
      }
    }
  })
}
</script>

<style scoped>

.infinite-list {
  height: 100%;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  padding: 0;
  margin-top: 0;
}

.infinite-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.item_index {
  width: 76px;
}

.item_index p {
  width: 76px;
  text-align: center;
  font-size: 22px;
  font-weight: bold
}

.list_item {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.list_item:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

.img {
  height: 156px;
  width: 108px;
  border-radius: 2px;
}

.des {
  display: grid;
  align-items: center;
  padding: 0 10px 0 20px;
  font-size: 15px;
}

.txt {
  margin: 10px 0;
  font-weight: 22;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<style>
.infinite-list ul {
  list-style-type: disc;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;

}
</style>
