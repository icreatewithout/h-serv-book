<script setup>
import {defineComponent, ref} from 'vue'
import {ElConfigProvider} from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const locale = ref(zhCn)

defineComponent({
  components: {
    ElConfigProvider,
  },
})

</script>

<template>
  <el-config-provider namespace="ep" :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<style scoped>

</style>
