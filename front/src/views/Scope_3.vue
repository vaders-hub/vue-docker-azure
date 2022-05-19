<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'
import Pie from '@/components/chart/Pie.vue'
import Doughnut from '@/components/chart/Doughnut.vue'
import StackedBar from '../components/chart/StackedBar.vue'

export default defineComponent({
  name: 'Scope_3',
  components: {
    Pie,
    Doughnut,
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
  <h2>Scope 3</h2>
  <Pie />
  <br><br><br>
  <Doughnut />
  <br><br><br>
</template>
