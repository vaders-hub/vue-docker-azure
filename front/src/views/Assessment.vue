<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Diagram1 from '@/components/chart/Diagram-1.vue'

import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Assessment',
  components: {
    Diagram1,
  },
  setup(context) {
    return {}
  },
})
</script>

<template>
  <h2>Assessment</h2>
  <Diagram1 />
</template>
