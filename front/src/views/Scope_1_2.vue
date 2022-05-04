<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'
import Spider from '@/components/chart/Spider.vue'
import StackedBar from '@/components/chart/StackedBar.vue'

export default defineComponent({
  name: 'Scope_1_2',
  components: {
    Spider,
    StackedBar,
  },
  setup(context) {
    const mainStore = useMainStore()

    return {
      mainStore,
    }
  },
})
</script>

<template>
  <h2>Scope 1, 2</h2>
  <Spider />
  <StackedBar />
</template>
