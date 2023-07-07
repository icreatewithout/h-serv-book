<template>
  <div class="content" :style="{'font-size': fontSize+'px'}" v-html="info.txt"></div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import api from "@/request/api.js";
import {ElMessage} from "element-plus";
import {lStorage} from "@utils/storage/index.js";

const route = useRoute()
const router = useRouter()

const props = defineProps({
  info: Object
})

const fontSize = ref(18)
const font_size_key = 'font_size'
onMounted(() => {
  const size = lStorage.get(font_size_key);
  if (size !== null && size !== undefined) {
    fontSize.value = size
  }
})

const add = () => {
  if (fontSize.value < 28) {
    fontSize.value = fontSize.value + 1
    lStorage.set(font_size_key, fontSize.value)
  }
}

const sub = () => {
  if (fontSize.value > 8) {
    fontSize.value = fontSize.value - 1
    lStorage.set(font_size_key, fontSize.value)
  }
}

defineExpose({
  add, sub
})
</script>

<style scoped>
.content {
  padding: 20px 100px;
}
</style>
