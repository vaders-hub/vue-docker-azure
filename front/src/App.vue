<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store/index'
import { setStorages } from '@/plugins/storages'
import LoadingData from '@/components/common/LoadingData.vue'
import LoadingPage from '@/components/common/LoadingPage.vue'

import type { InputEvents } from '@/interface/common'

export default defineComponent({
  name: 'App',
  components: { LoadingData, LoadingPage },
  setup(context) {
    const route = useRoute()
    const mainStore = useMainStore()
    const uiEvent = inject<InputEvents>('inputEvents')

    onMounted(() => {
      uiEvent?.initDetection()
      setStorages()
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
@import '@/assets/common.css';
@import '@/assets/devextreme.scss';
</style>
