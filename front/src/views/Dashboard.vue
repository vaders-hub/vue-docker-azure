<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";
import Drawer from "devextreme-vue/drawer";
import ScrollView from "devextreme-vue/scroll-view";
import Line from "@/components/chart/Line.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Header,
    SideBar,
    Drawer,
    ScrollView,
    Line,
  },
  setup(context) {
    return {};
  },
});
</script>

<template>
  <h2>dashboard</h2>
  <div class="chartArea"><Line /></div>
</template>

<style lang="scss">
@import "@/assets/base.css";
.chartArea {
  width: 20rem;
}
</style>
