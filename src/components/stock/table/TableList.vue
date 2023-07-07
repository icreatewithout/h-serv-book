<template>
  <el-tabs v-model="active" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="关注" name="1">
      <el-table :data="list">
        <el-table-column prop="tsCode" label="代码"/>
        <el-table-column prop="tsName" label="名称"/>
        <el-table-column prop="price" label="买价格"/>
        <el-table-column prop="lastPrice" label="最新价"/>
        <el-table-column prop="vol" label="买入量"/>
        <el-table-column prop="createTime" label="买入时间" :formatter="formatterTime"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="small" type="info" @click="getInfo(scope.row.tsCode)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background :layout="layout"
          :page-sizes="pageSizes"
          :total="total"
          @size-change="handleSizeChange"
          :default-page-size="pageSize"
          @current-change="handleCurrentChange"
      />
    </el-tab-pane>
    <el-tab-pane label="历史" name="2">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="tsCode" label="代码" width="180"/>
        <el-table-column prop="price" label="价格" width="180"/>
        <el-table-column prop="vol" label="买入量"/>
        <el-table-column prop="createTime" label="买入时间"/>
      </el-table>
      <el-pagination
          background :layout="layout"
          :page-sizes="pageSizes"
          :total="total"
          @size-change="handleSizeChange"
          :default-page-size="pageSize"
          @current-change="handleCurrentChange"
      />
    </el-tab-pane>
  </el-tabs>
  <el-row v-if="info">
    <el-col>
      <BaseInfo :item="info"/>
    </el-col>
  </el-row>
  <el-row v-if="info" style="height: 200px">
    <el-col>
      <CloseLine :data="info.dailyVos" :average="info.average"/>
    </el-col>
  </el-row>
  <el-row v-if="info" :gutter="5" style="height: 200px">
    <el-col :span="12">
      <PriceLine :data="info"/>
    </el-col>
    <el-col :span="12">
      <Line :data="info.macds"/>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      资金流入
    </el-col>
  </el-row>
</template>

<script setup>

import {ref} from "@vue/runtime-core";
import {onMounted} from "vue";
import api from "@/request/api";
import {ElMessage} from "element-plus";
import BaseInfo from "@components/stock/BaseInfo.vue";
import PriceLine from "@components/stock/PriceLine.vue";
import Line from "@components/stock/Line.vue";
import CloseLine from "@components/stock/chart/CloseLine.vue";

const props = defineProps({
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array,
    default() {
      return [2, 10, 20, 30, 50, 100]
    }
  },
})
const active = ref('1')

const handleClick = (tab, event) => {
  const status = tab.props.name
  pageNum.value = 1
  list.value = []
  findList(status)
}

const pageNum = ref(1)
const pageSize = ref(5)
const list = ref([])
onMounted(() => {
  findList('1')
})

const total = ref(0)
const findList = (status) => {
  const data = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    status: status
  }
  api.flowList(data).then((res) => {
    list.value = res.data.content
    if (list.value.length > 0) {
      getInfo(list.value[0].tsCode)
    }
    pageNum.value = pageNum.value + 1
    total.value = res.data.totalElements
  }).catch((err) => {
    return ElMessage.error(err.message)
  })
}

const formatterTime = (row, column) => {
  return row.createTime.substring(0, 9)
}

const handleSizeChange = (size) => {
  pageSize.value = size
  pageNum.value = 1
  findList(active.value)
}
const handleCurrentChange = (number) => {
  pageNum.value = number
  findList(active.value)
}

const info = ref(null)
const getInfo = (tsCode) => {
  api.stockInfo(tsCode).then((res) => {
    if (res.code === 200) {
      info.value = null
      info.value = res.data
    }
  }).catch((err) => {
    ElMessage.error(err.message)
  })
}

defineExpose({
  getInfo
})

</script>

<style scoped>

</style>
