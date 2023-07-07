<template>
  <div class="nav">
    <el-form :model="form" inline label-width="60px" label-position="left">
      <el-form-item label="名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="代码">
        <el-input v-model="form.tsCode"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">搜索</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button :disabled="disabled" @click="changeType('1')">模式一</el-button>
    <el-button :disabled="!disabled" @click="changeType('2')">模式二</el-button>
    <el-input v-model="closePrice" style="width: 50px;padding-left: 10px"/>
  </div>
  <div class="list">
    <div id="left_div_11" style="padding: 10px;list-style: none;">
      <ul v-infinite-scroll="loadMore" class="infinite-list"
          :infinite-scroll-immediate="true" infinite-scroll-distance="20">
        <el-row>
          <el-col :span="12" v-for="item in list" style="padding-bottom: 5px">
            <div style="position: relative;padding: 15px;">
              <div style="position: absolute;right: 60px;top: 10px">
                <a href="javascript:void(0)" @click="getInfo(item.tsCode)">
                  <el-tag type="info" size="small">详情</el-tag>
                </a>
              </div>
              <div style="position: absolute;right: 10px;top: 10px">
                <a href="javascript:void(0)" :data-code="item.tsCode" :data-name="item.name"
                   :data-close="item.daily.close" @click="flow">
                  <el-tag size="small">关注</el-tag>
                </a>
              </div>
              <BaseInfo :item="item"/>
              <div style="width: 100%;height: 200px">
                <CloseLine :data="item.dailyVos" :average="item.average"/>
              </div>
              <div style="width: 100%;height: 200px">
                <PriceLine :data="item"/>
              </div>
              <div style="width: 100%;height: 200px">
                <Line :data="item.macds"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </ul>
    </div>
  </div>
  <el-dialog
      v-model="open"
      title="关注"
      width="30%"
  >
    <div style="margin: auto">
      <el-form :model="subForm" label-width="60px" label-position="left">
        <el-form-item label="代码">
          <el-input v-model="subForm.tsCode" readonly/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="subForm.tsName" readonly/>
        </el-form-item>
        <el-form-item label="买入（手）">
          <el-input v-model="subForm.vol" type="number"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="subForm.price" type="number"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import Line from '@components/stock/Line.vue'
import PriceLine from '@components/stock/PriceLine.vue'
import BaseInfo from '@components/stock/BaseInfo.vue'
import {useAuthStore} from "@store/useAuthStore";
import {computed, reactive, ref} from "vue";
import {getToken} from "@utils/token";
import {ElLoading, ElMessage} from "element-plus";
import api from "@/request/api.js";

const disabled = ref(true)
const type = ref('1')
const closePrice = ref(6)
const authStore = useAuthStore()
const uid = computed(() => authStore.getId);
const wsUrl = import.meta.env.VITE_WS_URL
let ws = null
let heartTimeout = null
let reTimeout = null
let close = ref(0);


const changeType = (val) => {
  disabled.value = !disabled.value
  type.value = val
  pageNum.value = 1
  list.value = []
  const data = {
    close: closePrice.value,
    type: type.value,
    pageNum: 1,
    pageSize: pageSize
  }
  connectWs(JSON.stringify(data))
}

const connectWs = (data) => {
  const url = wsUrl + uid.value
  ws = new WebSocket(url, [getToken()]);
  ws.onopen = () => {
    heartbeat()
    ws.send(data)
  }
  ws.onerror = (e) => {
    close.value = close.value + 1
  }
  ws.onmessage = (res) => {
    const result = JSON.parse(res.data)
    let l = list.value
    l.push(...result.data.content)
  }
  ws.onclose = (e) => {
    if (close.value < 10) {
      reconnect()
    }
  }
}

const heartbeat = () => {
  heartTimeout = setTimeout(() => {
    if (ws.readyState !== 1) {
      reconnect()
    }
  }, 30 * 1000)
}

const reconnect = () => {
  reTimeout = setTimeout(() => {
    if (ws.readyState !== 1) {
      const data = {
        close: closePrice.value,
        type: type.value,
        pageNum: 1,
        pageSize: pageSize
      }
      connectWs(JSON.stringify(data))
    }
  }, 5000)
}

const pageNum = ref(0)
const pageSize = 4
const list = ref([])
const loadMore = () => {
  pageNum.value = pageNum.value + 1
  const data = {
    close: closePrice.value,
    type: type.value,
    pageNum: pageNum.value,
    pageSize: pageSize
  }
  if (ws === null || ws === undefined) {
    connectWs(JSON.stringify(data));
  } else {
    ws.send(JSON.stringify(data))
  }
}

const form = reactive({
  tsCode: null,
  name: null,
})

const submitForm = () => {
  const loading = ElLoading.service({
    lock: true,
    fullscreen: false,
    target: document.querySelector('#left_div_11'),
    text: 'Loading',
  })
  try {
    list.value = []
    pageNum.value = 1
    const data = {
      pageNum: pageNum.value,
      pageSize: pageSize,
      tsCode: form.tsCode,
      name: form.name,
      type: type.value
    }
    ws.send(JSON.stringify(data))
  } finally {
    loading.close()
  }
}

const resetForm = () => {
  const loading = ElLoading.service({
    lock: true,
    fullscreen: false,
    target: document.querySelector('#left_div_11'),
    text: 'Loading',
  })
  try {
    form.tsCode = null;
    form.name = null;
    pageNum.value = 1
    list.value = []
    const data = {
      pageNum: pageNum.value,
      pageSize: pageSize
    }
    ws.send(JSON.stringify(data))
  } finally {
    loading.close()
  }
}

const subForm = reactive({
  tsCode: null,
  tsName: null,
  price: null,
  vol: 10,
})
const open = ref(false)
const flow = (e) => {
  open.value = true
  subForm.tsCode = e.currentTarget.dataset.code
  subForm.tsName = e.currentTarget.dataset.name
  subForm.price = e.currentTarget.dataset.close
}
const cancel = () => {
  open.value = false
}

const submit = () => {
  api.flow(subForm).then((res) => {
    if (res.code === 200) {
      open.value = false
    }
  }).catch((err) => {
    return ElMessage.error(err.message)
  })
}

const emits = defineEmits(['getInfo'])

const getInfo = (tsCode) => {
  emits('getInfo', tsCode)
}
</script>

<style scoped>


.nav {
  height: 80px;
}

.list {
  width: 100%;
  position: absolute;
  display: flex;
  top: 80px;
  bottom: 0px;
  left: 0;
}

.infinite-list {
  height: 100%;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.infinite-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
