<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, inject } from 'vue'
import { useMainStore } from '@/store/index'
import LoadingData from '@/components/common/LoadingData.vue'
import LoadingPage from '@/components/common/LoadingPage.vue'

import type { InputEvents } from '@/interface/common'

export default defineComponent({
  name: 'App',
  components: { LoadingData, LoadingPage },
  renderError(h, err) {
    return h('pre', { style: { color: 'red' } }, err.stack)
  },
  setup(context) {
    const uiEvent = inject<InputEvents>('inputEvents')
    const mainStore = useMainStore()

    onMounted(() => {
      uiEvent?.initDetection()
    })

    return {
      mainStore,
    }
  },
})
</script>

<template>
  <LoadingData :visible="mainStore.loadingData" />
  <LoadingPage :visible="mainStore.loadingPage" />
  <component :is="mainStore.layout" />
</template>
<style lang="scss">
@import '@/assets/base.scss';
@import '@/assets/dx-diagram.css';
@import '@/assets/devextreme.scss';
</style>
