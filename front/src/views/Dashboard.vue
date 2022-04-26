<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import Line from '@/components/chart/Line.vue'
import DefaultGrid from '@/components/datagrid/DefaultGrid.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Line,
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
  <Line />
  <br />
  <DefaultGrid />
</template>
