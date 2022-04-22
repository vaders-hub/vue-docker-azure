<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, inject } from "vue";
import { useMainStore } from "@/store/index";
import LoadingData from "@/components/common/LoadingData.vue";
import LoadingPage from "@/components/common/LoadingPage.vue";

import type { SessionTimeout } from '@/interface/common'

export default defineComponent({
  name: "App",
  components: { LoadingData, LoadingPage },
  setup(context) {
    const mainStore = useMainStore();
    const st = inject<SessionTimeout>("sessionTimeout")
    st?.tick()

    const stopTick = () => {
      st?.clear()
    }
    return {
      mainStore,
      stopTick
    };
  },
});
</script>

<template>
  <LoadingData :visible="mainStore.loadingData" />
  <LoadingPage :visible="mainStore.loadingPage" />
  <button @click="stopTick">clear</button>
  <component :is="mainStore.layout" />
</template>
