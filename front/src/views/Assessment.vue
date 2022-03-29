<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useMainStore } from "@/store/index";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  name: "Assessment",
  components: {
    DxButton,
  },
  setup(context) {
    const mainStore = useMainStore();

    return {
      mainStore,
    };
  },
});
</script>

<template>
  <h2>assessment</h2>
  <DxButton
    text="Fetch"
    type="normal"
    styling-mode="outlined"
    @click="mainStore.login()"
  />
</template>
