<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'
import Pareto from '@/components/chart/Pareto.vue'
import Diagram1 from '@/components/chart/Diagram-1.vue'
import Diagram2 from '@/components/chart/Diagram-2.vue'
import DefaultGrid from '@/components/datagrid/DefaultGrid.vue'

import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Line,
    DefaultGrid,
    Diagram1,
    Diagram2,
  },
  setup(context) {
    const dashboardStore = useDashboardStore()
    const gridOptions = reactive({
      pager: true,
      loadedData: [],
    })
    const lineOptions = reactive<LineOptions>({
      idName: 'chart-demo',
      series: [
        { value: 'hydro', name: 'Hydro-electric' },
        { value: 'oil', name: 'Oil' },
        { value: 'gas', name: 'Natural gas' },
        { value: 'coal', name: 'Coal' },
      ],
      loadedData: [],
    })
    const loadDatas = async () => {
      try {
        await dashboardStore.loadData('table')
        await dashboardStore.loadData('line')

        gridOptions.loadedData = dashboardStore.dataSet.table
        lineOptions.loadedData = dashboardStore.dataSet.line
      } catch (e) {
        console.warn(e)
      }
    }

    onMounted(() => {
      loadDatas()
    })

    const testEmit = () => {
      console.log('test emit')
    }

    return { lineOptions, gridOptions, testEmit }
  },
})
</script>

<template>
  <h2>Dashboard</h2>
  <Diagram1 />
  <!-- <Line :Options="lineOptions" @testEmit="testEmit" />
  <br />
  <DefaultGrid :Options="gridOptions" /> -->
</template>
