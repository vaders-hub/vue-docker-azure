<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import { useMainStore } from "@/store/index";
import LoadingData from "@/components/common/LoadingData.vue";
import LoadingPage from "@/components/common/LoadingPage.vue";

export default defineComponent({
  name: "App",
  components: { LoadingData, LoadingPage },
  setup(context) {
    const mainStore = useMainStore();

    return {
      mainStore,
    };
  },
});
</script>

<template>
  <LoadingData :visible="mainStore.loadingData" />
  <LoadingPage :visible="mainStore.loadingPage" />
  <component :is="mainStore.layout" />
</template>
