<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import { useMainStore } from "@/store/index";
import LoadingPage from "@/components/common/LoadingPage.vue";

export default defineComponent({
  name: "App",
  components: { LoadingPage },
  setup(context) {
    const mainStore = useMainStore();

    return {
      mainStore,
    };
  },
});
</script>

<template>
  <LoadingPage :visible="mainStore.loadingPage" />
  <component :is="mainStore.layout" />
</template>
