<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import Line from "@/components/chart/Line.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Line,
  },
  setup(context) {
    return {};
  },
});
</script>

<template>
  <h2>Dashboard</h2>
  <div class="chartArea"><Line /></div>
</template>

<style lang="scss">
@import "@/assets/base.scss";
@import "@/assets/devextreme.scss";
.chartArea {
  width: 20rem;
}
</style>
