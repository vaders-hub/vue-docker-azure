<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'
import Pareto from '@/components/chart/Pareto.vue'
import DefaultGrid from '@/components/datagrid/DefaultGrid.vue'

import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Line,
    DefaultGrid,
  },
  setup(context) {
    const dashboardStore = useDashboardStore()
    const gridOptions = reactive({
      pager: true,
      loadedData: [],
    })
    const lineOptions = reactive<LineOptions>({
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

    return { lineOptions, gridOptions }
  },
})
</script>

<template>
  <h2>Dashboard</h2>
  <Line :Options="lineOptions" />
  <br />
  <DefaultGrid :Options="gridOptions" />
</template>
