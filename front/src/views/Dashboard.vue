<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import Line from '@/components/chart/Line.vue'
import Pareto from '@/components/chart/Pareto.vue'
import DefaultGrid from '@/components/datagrid/DefaultGrid.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Line,
    Pareto,
    DefaultGrid,
  },
  setup(context) {
    return {}
  },
})
</script>

<template>
  <h2>Dashboard</h2>
  <Line idName="chart-demo" />
  <Pareto idName="chart-demo" />
  <br />
  <DefaultGrid />
</template>
