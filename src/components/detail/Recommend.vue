<template>
  <p>用户读书推荐率{{ calculate.r1 }}%</p>
  <el-row :gutter="30">
    <el-col :span="4">
      <div style="display: flex;align-items: center;">
        <img v-if="calculate.r1<=60" style="height: 30px" src="@assets/book/bbby60.png"/>
        <img v-if="calculate.r1>60 && calculate.r1<=70" style="height: 30px" src="@assets/book/zdyd70.png"/>
        <img v-if="calculate.r1>70 && calculate.r1<=80" style="height: 30px" src="@assets/book/kzrk80.png"/>
        <img v-if="calculate.r1>80 && calculate.r1<=85" style="height: 30px" src="@assets/book/hprc85.png"/>
        <img v-if="calculate.r1>85" style="height: 30px" src="@assets/book/sz90.png"/>
      </div>
      <div style="padding: 10px 0;font-size: 14px;display: flex;align-items: center">
        {{ calculate.count }}人点评
        <el-icon size="14">
          <ArrowRight/>
        </el-icon>
      </div>
    </el-col>
    <el-col :span="20">
      <div style="width: 100%;">
        <div style="display:flex;align-items: center;">
          <el-progress :text-inside="false" color="grey" type="line" :percentage="calculate.r1" :format="format1"/>
        </div>
        <div style="display:flex;align-items: center;">
          <el-progress :text-inside="false" color="grey" type="line" :percentage="calculate.r2" :format="format2"/>
        </div>
        <div style="display:flex;align-items: center;">
          <el-progress :text-inside="false" color="grey" type="line" :percentage="calculate.r3" :format="format3"/>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="40" style="padding-top: 20px">
    <el-col :span="8">
      <el-button class="btn" size="large" icon="Sunrise" property="info" @click="openView('1')">推荐</el-button>
    </el-col>
    <el-col :span="8">
      <el-button class="btn" size="large" icon="PartlyCloudy" property="info" @click="openView('2')">
        一般
      </el-button>
    </el-col>
    <el-col :span="8">
      <el-button class="btn" size="large" icon="Pouring" property="info" @click="openView('3')">不行
      </el-button>
    </el-col>
  </el-row>
  <el-dialog
      v-model="open"
      width="500px"
      align-center
      center
      style="border-radius: 18px"
  >
    <template #header>
      <el-row>
        <el-col :span="24" style="display: flex;justify-content: center">
          <span style="font-size: 28px">对本书进行点评</span>
        </el-col>
      </el-row>
    </template>
    <el-row :gutter="40" style="padding: 0 40px 40px 40px">
      <el-col :span="8">
        <el-button :class="type==='1'?'btn select':'btn'" size="large" icon="Sunrise" property="info"
                   @click="openView('1')">推荐
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button :class="type==='2'?'btn select':'btn'" size="large" icon="PartlyCloudy" property="info"
                   @click="openView('2')">
          一般
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button :class="type==='3'?'btn select':'btn'" size="large" icon="Pouring" property="info"
                   @click="openView('3')">不行
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input type="textarea" v-model="val" style="border: none" rows="10">Open the dialog from the center from the
          screen
        </el-input>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="open = false">取消</el-button>
        <el-button type="primary" @click="sub">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <LoginQr ref="refLoginQr"/>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import {useAuthStore} from "@store/useAuthStore.js";
import LoginQr from "@components/home/LoginQr.vue";

const props = defineProps({
  id: String,
})
const status = computed(() => useAuthStore().getLogin);
const emits = defineEmits(['refresh'])

const calculate = ref({})
onMounted(() => {
  api.calculate(props.id).then((res) => {
    if (res.code === 200) {
      calculate.value = res.data
    }
  })
})

const format1 = (percentage) => ('推荐')
const format2 = (percentage) => ('一般')
const format3 = (percentage) => ('不行')

const refLoginQr = ref()
const open = ref(false)
const type = ref('')
const openView = (val) => {

  if (status.value) {
    open.value = true
    type.value = val
  } else {
    refLoginQr.value.openView()
  }
}

const val = ref('')
const sub = () => {
  const data = {
    bid: props.id,
    rate: type.value,
    comments: val.value,
  }
  api.rate(data).then((res) => {
    if (res.code === 200) {
      open.value = false
      val.value = ''
      emits('refresh', res.data)
    } else {
      ElMessage.error(res.message)
    }
  }).catch(err => {
    ElMessage.error(err.message)
  })
}
</script>

<style scoped>
.btn {
  width: 100%;
  border-radius: 10px;
  height: 50px
}

.select {
  color: #eeeeee;
  background-color: #3699ef;
}
</style>
