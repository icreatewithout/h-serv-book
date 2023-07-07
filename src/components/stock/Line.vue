<template>
  <v-chart ref="chart" class="chart " style="width: 100%;height: 100%" :option="option"/>
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

const chart = ref()
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
      data: props.data.date.map(m => {
        return m
      })
    },
    yAxis: {
      type: 'value',
      scale: false
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: props.data.deas.map(m => {
          return m
        }),
        name: 'dea',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.difs.map(m => {
          return m
        }),
        name: 'dif',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.macds.map(m => {
          return m
        }),
        name: 'macd',
        type: 'bar',
        smooth: true,
        showSymbol: false
      },
      // {
      //   data: props.data.ema.emas.map(m => {
      //     return m
      //   }),
      //   name: 'ema9',
      //   type: 'line',
      //   smooth: true,
      //   showSymbol: false
      // }
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
