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
  average: Number
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
      data: props.data.map(m => {
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
        data: props.data.map(m => {
          return m.open
        }),
        name: 'open',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.map(m => {
          return m.close
        }),
        name: 'close',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.map(m => {
          return m.high
        }),
        name: 'high',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.map(m => {
          return m.low
        }),
        name: 'low',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        data: props.data.map(m => {
          return props.average
        }),
        name: 'average',
        type: 'line',
        smooth: true,
        showSymbol: false
      },
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
