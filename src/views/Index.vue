<template>
  <Header/>
  <div class="container">
    <MyShelf/>
    <Like/>
    <el-row :gutter="40">
      <el-col :span="12">
        <div class="title">
          <div class="img_icon">
            <img class="img" src="@assets/top200.png"/>
            用户热评、强烈推荐的书籍小说
          </div>
          <div class="more">
            <div style="display:flex;align-items: center;">
              <el-link type="info" href="/category/1001001" :underline="false">查看更多</el-link>
              <el-icon size="14">
                <ArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
        <HomeBook :list="great"/>
      </el-col>
      <el-col :span="12">
        <div class="title">
          <div class="img_icon">
            <img class="img" src="@assets/top_200.png"/>
            最受大家喜爱阅读的书籍小说
          </div>
          <div class="more">
            <div style="display:flex;align-items: center">
              <el-link type="info" href="/category/2001002" :underline="false">查看更多</el-link>
              <el-icon size="14">
                <ArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
        <HomeBook :list="top200"/>
      </el-col>
    </el-row>

    <el-row :gutter="40">
      <el-col :span="12">
        <div class="title">
          <div class="img_icon">
            <img class="img" src="@assets/top_50.png"/>
            近期用户喜欢阅读书籍小说
          </div>
          <div class="more">
            <div style="display:flex;align-items: center">
              <el-link type="info" href="/category/3001003" :underline="false">查看更多</el-link>
              <el-icon size="14">
                <ArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
        <HomeBook icon="@assets/top_50.png" :list="top50"/>
      </el-col>
      <el-col :span="12">
        <div class="title">
          <div class="img_icon">
            <img class="img" src="@assets/top50.png"/>
            用户喜欢的新书
          </div>
          <div class="more">
            <div style="display:flex;align-items: center">
              <el-link type="info" href="/category/4001004" :underline="false">查看更多</el-link>
              <el-icon size="14">
                <ArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
        <HomeBook/>
      </el-col>
    </el-row>

    <div style="font-size: 18px;font-weight: bold;padding-top: 50px">分类归集</div>
    <el-divider class="divider"/>
    <el-row :gutter="20">
      <el-col v-for="item in list" :span="6">
        <a :href="'/category/'+item.val">
          <div class="category_name">
            <el-link :underline="false">{{ item.otherName }}</el-link>
          </div>
        </a>
        <el-divider class="divider1"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="footer">
        <span>No Copyright © ∞ Knowledge is Power . Content Copyright Belongs To Users</span>
        <span>If there is infringement, please contact the platform to delete it!</span>
        <span style="font-size: 12px">联系我们 Telegram @xiawuwutongshu 如有侵权请联系平台删除</span>
        <el-link href="/privacy" :underline="false">隐私政策 - 查看</el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Header from "@components/home/Header.vue";
import HomeBook from "@components/home/HomeBook.vue";
import {onMounted, ref} from "vue";
import api from "@/request/api.js";
import LoginQr from "@components/home/LoginQr.vue";
import {ElMessage} from "element-plus";
import MyShelf from "@components/home/MyShelf.vue";
import Like from "@components/home/Like.vue";


const list = ref([])
onMounted(async () => {
  api.category().then((res) => {
    if (res.code === 200) {
      list.value = res.data
    }
  })
  findGreat()
  findTop50()
  findTop200()
})

const great = ref([])
const findGreat = () => {
  const data = {
    pageNum: 1,
    pageSize: 6
  }
  api.homeGreat(data).then((res) => {
    if (res.code === 200) {
      great.value = res.data.content
    }
  })
}

const top50 = ref([])
const findTop50 = () => {
  const data = {
    pageNum: 1,
    pageSize: 6
  }
  api.home50(data).then((res) => {
    if (res.code === 200) {
      top50.value = res.data.content
    }
  })
}

const top200 = ref([])
const findTop200 = () => {
  const data = {
    pageNum: 1,
    pageSize: 6
  }
  api.home200(data).then((res) => {
    if (res.code === 200) {
      top200.value = res.data.content
    }
  })
}
</script>

<style scoped>

.img_icon {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: grey;
}

.img_icon img {
  padding-bottom: 4px;
  height: 32px;
  width: 240px;
}

.title {
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 20px;
}

.more {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  font-size: 14px;
  color: grey;
}

.divider {
  margin-bottom: 0;
}

.category_name {
  padding: 20px 10px;
}

.divider1 {
  margin-top: 0;
  margin-bottom: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding-top: 50px;
  padding-bottom: 10px;
}

.category_name:hover {
  background-color: rgba(107, 106, 106, 0.2);
}
</style>

<style>

</style>
