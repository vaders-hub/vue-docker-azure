<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Diagram from '@/components/chart/Diagram-edit.vue'

export default defineComponent({
  name: 'DiagramManagement',
  components: {
    Diagram,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <h3>DiagramManagement</h3>
  <Diagram />
</template>
