<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useMainStore } from "@/store/index";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  name: "Scope_1_2",
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
  <h2>Scope 1, 2</h2>
  <DxButton
    text="Fetch"
    type="normal"
    styling-mode="outlined"
    @click="mainStore.login({})"
  />
</template>

<style lang="scss">
@import "@/assets/base.css";
.chartArea {
  width: 20rem;
}
</style>
