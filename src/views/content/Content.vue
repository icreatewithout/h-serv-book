<template>
  <el-affix>
    <ContentHeader :id="info.bid" :name="info.name" :catalog="info.catalog" :shelf="info.shelf"
                   @change-shelf="changeShelf"/>
  </el-affix>
  <div class="container">
    <el-card class="card_box_content" v-loading="loading" :element-loading-text="loadingTxt">
      <ContentTxt v-if="!loading" ref="contentTxtRef" :info="info"/>
      <div v-if="!loading" style="padding: 40px;display: flex;justify-content: center">
        <el-button style="width: 40%;border-radius: 10px;height: 60px" size="large" type="info" @click="next">
          下一章
        </el-button>
      </div>
    </el-card>
  </div>
  <div class="right_menu">
    <el-button type="info" circle @click="next">
      <el-icon size="20">
        <ArrowRight/>
      </el-icon>
    </el-button>
    <el-button type="info" circle @click="prev">
      <el-icon size="20">
        <ArrowLeft/>
      </el-icon>
    </el-button>
    <el-button type="info" circle @click="openCatalog">
      <el-icon size="20">
        <Operation/>
      </el-icon>
    </el-button>
    <el-button type="info" circle @click="add">
      <div style="font-size: 20px">A+</div>
    </el-button>
    <el-button type="info" circle @click="sub">
      <div style="font-size: 20px">A-</div>
    </el-button>
    <el-button type="info" circle @click="openAppQr">
      <el-icon size="20">
        <Iphone/>
      </el-icon>
    </el-button>
  </div>
  <CatalogList ref="catalogListRef"/>
  <AppQr ref="refAppQr"/>
</template>

<script setup>

import ContentHeader from "@components/content/ContentHeader.vue";
import ContentTxt from "@components/content/ContentTxt.vue";
import {onMounted, ref, watch} from "vue";
import CatalogList from "@components/detail/CatalogList.vue";
import {useRoute, useRouter} from "vue-router";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import AppQr from "@components/home/AppQr.vue";

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const loadingTxt = ref('加载中')
const id = ref('')
const info = ref({})
const content = (cid) => {
  api.content(cid).then((res) => {
    info.value = res.data
  }).catch((err) => {
    ElMessage.error(err.message)
  }).finally(() => {
    loading.value = false
  })
}


const changeShelf = (val) => {
  info.value.shelf = val
}

watch(() => route, () => {
  loading.value = true
  id.value = route.params.id
  content(route.params.id)
}, {
  immediate: true,
  deep: true
})
const catalogListRef = ref()
const openCatalog = () => {
  catalogListRef.value.open(info.value.bid)
}

const contentTxtRef = ref()
const add = () => {
  contentTxtRef.value.add()
}

const sub = () => {
  contentTxtRef.value.sub()
}
const prev = () => {
  api.prevContent(info.value.bid, id.value).then((res) => {
    if (res.code === 200) {
      router.push('/content/' + res.data)
    } else {
      ElMessage.error(res.message)
    }
  }).catch(err => ElMessage.error(err.message))
}
const next = () => {
  api.netxContent(info.value.bid, id.value).then((res) => {
    if (res.code === 200) {
      router.push('/content/' + res.data)
    } else {
      ElMessage.error(res.message)
    }
  }).catch(err => ElMessage.error(err.message))
}

const refAppQr = ref()
const openAppQr = () => {
  refAppQr.value.openView()
}
</script>

<style scoped>

.card_box_content {
  border: none;
  border-radius: 0;
  min-height: calc(100vh - 72px);
}

.loading_view {
  position: absolute;
  top: 140px;
  right: 0;
  left: 0;
  bottom: calc(100vh - 70px);
  display: flex;
  align-items: center;
}

.loading_view_show {
  width: 100%;
  padding-top: 50px;
}

.right_menu {
  position: fixed;
  bottom: 80px;
  right: calc(((100% - 1000px) / 2) - 80px);
  display: flex;
  flex-direction: column;
}

.right_menu button {
  height: 48px;
  width: 48px;
  margin-top: 30px;
  margin-left: 0;
}
</style>
<style>
.card_box_content .ep-card__body {
  padding: 0;
}
</style>
