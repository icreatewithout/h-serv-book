<template>
  <div style="display:flex;flex-direction: row">
    <div style="display:flex;flex-direction: column;flex: 2">
      <div style="display: flex;flex-direction: row;align-items: center">
        {{ item.name }}<div v-if="item.area">({{ item.area }})</div>
      </div>
      <div>
        {{ item.symbol }}
      </div>

      <div style="font-size: 14px;display: flex">
        <div v-if="item.industry">{{ '行业：' + item.industry }}</div>
      </div>
      <div v-if="item.market" style="font-size: 14px;padding-top: 4px">
        {{ '市场：' + item.market }}
      </div>
    </div>
    <div style="display:flex;flex-direction: column;padding-left: 10px;flex: 4;font-size: 14px;color: grey">
      <div>{{ item.daily.tradeDate }} &nbsp;均 : {{ item.average }}</div>
      <div>开 : {{ item.daily.open }} &nbsp;收 : {{ item.daily.close }} &nbsp;高 :
        {{ item.daily.high }} &nbsp;低 : {{ item.daily.low }}
      </div>
      <div style="display: flex;">
        <div style="flex: 1;">涨跌额 : {{ item.daily.change }}</div>
        <div style="flex: 1;">涨跌幅 : {{ item.daily.pctChg }}%</div>
      </div>
      <div style="display: flex;">
        <div style="flex: 1;">成交额 : {{ item.daily.amount }}</div>
        <div style="flex: 1;">成交量 : {{ item.daily.vol }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
})
</script>

<style scoped>

</style>
