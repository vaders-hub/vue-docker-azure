<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'

export default defineComponent({
  name: 'Scope_3',
  components: {},
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
</template>
