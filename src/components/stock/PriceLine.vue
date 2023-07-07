<template>
  <v-chart class="chart " style="width: 100%;height: 100%" :option="option"/>
</template>

<script setup>
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {BarChart, PieChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, {THEME_KEY} from 'vue-echarts';
import {ref, defineComponent, reactive, onMounted, watch} from 'vue';

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps({
  data: Object,
})

const option = ref({})
watch(() => props.data, async () => {
  option.value = {
    grid: {
      left: '0',
      right: '0',
      bottom: '2%',
      padding: 0,
      containLabel: true
    },

    xAxis: {
      data: props.data.dailyVos.map(m => {
        return m.tradeDate
      })
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [

      {
        data: props.data.dailyVos.map(m => {
          return m.vol
        }),
        name: 'vol',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.elder2.elders.map(m => {
          return m
        }),
        name: 'elder2',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.elder13.elders.map(m => {
          return m
        }),
        name: 'elder13',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.dailyVos.map(m => {
          return m.amount
        }),
        name: 'amount',
        type: 'bar',
        smooth: true,
        showSymbol: false,
        color: '#d1c7c7'
      }
    ]
  }
}, {
  immediate: true,
  deep: true
})
</script>

<style scoped>
.a {
  height: 200px;
  width: 500px;
}
</style>
