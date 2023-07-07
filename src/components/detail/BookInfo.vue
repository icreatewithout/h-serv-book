<template>
  <div class="item">
    <div>
      <el-image class="img" :src="info.cover" fit="cover"/>
    </div>
    <div class="des">
      <div>
        <el-link style="font-size: 22px;padding-bottom: 8px" :underline="false">{{ info.name }}</el-link>
      </div>
      <div style="padding: 5px 0;">
        <el-link style="color: #0097ff;font-size: 18px" :href="'/author/'+info.author" :underline="false">{{ info.author }}</el-link>
      </div>
      <div class="txt">
        {{ info.des }}
      </div>
    </div>
    <div class="add">
      <el-button v-if="!shelf" icon="reading" type="info" class="btn" @click="addShelf">加入书架</el-button>
      <el-button v-if="shelf" icon="reading" type="success" class="btn">已加入</el-button>
    </div>
  </div>
  <el-row :gutter="20" style="padding-top: 50px">
    <el-col :span="6" v-for="item in catalogs">
      <a href="javascript:void(0)" @click="toDetail(item.id)">
        <el-card class="box-card1" shadow="hover">
          <div class="catename">
            <span>{{ item.name }}</span>
            <div style="display: flex;align-items: center">{{ item.createTime }}<span
                style="padding-left: 4px">已更新</span></div>
          </div>
        </el-card>
      </a>
    </el-col>
    <el-col :span="6">
      <a href="javascript:void(0)">
        <el-card class="box-card1" shadow="hover" @click="openDrawer">
          <div style="display: flex;flex-direction: column;font-size: 14px">
            <span>查看全部章节</span>
            <span>共{{ count }}章</span>
          </div>
        </el-card>
      </a>
    </el-col>
  </el-row>
  <CatalogList ref="catalogListRef"/>
  <LoginQr ref="refLoginQr"/>
</template>

<script setup>
import CatalogList from "@components/detail/CatalogList.vue";
import {onMounted, ref} from "vue";
import api from "@/request/api.js";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import LoginQr from "@components/home/LoginQr.vue";

const router = useRouter()
const props = defineProps({
  id: String
})
const catalogListRef = ref()
const openDrawer = () => {
  catalogListRef.value.open(props.id)
}

const info = ref({})
const catalogs = ref({})
const count = ref(null)
const shelf = ref(false)
onMounted(() => {
  api.bookDetail(props.id).then((res) => {
    if (res.code === 200) {
      info.value = res.data.bookVo
      catalogs.value = res.data.catalogVos
      count.value = res.data.count
      shelf.value = res.data.shelf
    }
  })
})

const toDetail = (cid) => {
  router.push("/content/" + cid)
}

const refLoginQr = ref()
const addShelf = () => {
  api.addShelf(props.id).then((res) => {
    if (res.code === 200) {
      ElMessage.success("已完成")
      shelf.value = true
    } else {
      ElMessage.error(res.message)
    }
  }).catch((err) => {
    if (err.code === 401) {
      refLoginQr.value.openView()
    } else {
      ElMessage.error(err.message)
    }
  })
}
</script>

<style scoped>
.box-card1 {

}

.item {
  display: flex;
  position: relative;
}

.img {
  height: 232px;
  width: 160px;
  border-radius: 2px;
}

.des {
  padding: 0 10px 0 20px;
  font-size: 15px;
}

.txt {
  margin: 10px 0;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}

.add {
  position: absolute;
  right: 0
}

.add button {
  border-radius: 20px;
  height: 40px;
}

.catename {
  display: flex;
  flex-direction: column;
  font-size: 14px
}

.catename span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.box-card1:hover {
  background-color: rgba(107, 106, 106, 0.2);
}

</style>

