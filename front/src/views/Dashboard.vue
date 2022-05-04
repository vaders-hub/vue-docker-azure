<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'
import Pareto from '@/components/chart/Pareto.vue'
import DefaultGrid from '@/components/datagrid/DefaultGrid.vue'

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
    const loadData = async () => {
      await dashboardStore.loadTableData('')
      gridOptions.loadedData = dashboardStore.tableData
    }

    onMounted(() => {
      loadData()
    })

    return { gridOptions }
  },
})
</script>

<template>
  <h2>Dashboard</h2>
  <Line />
  <br />
  <DefaultGrid :gridOptions="gridOptions" />
</template>
