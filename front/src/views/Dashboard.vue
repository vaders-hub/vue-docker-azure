<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";
import Drawer from "devextreme-vue/drawer";
import ScrollView from "devextreme-vue/scroll-view";

export default defineComponent({
  name: "Dashboard",
  components: {
    Header,
    SideBar,
    Drawer,
    ScrollView,
  },
  setup(context) {
    return {};
  },
});
</script>

<template>
  <!-- <Header />
  <Drawer>
    <SideBar />
    <ScrollView> dashboard </ScrollView>
  </Drawer> -->
  <div>dashboard</div>
</template>

<style>
@import "@/assets/base.css";
</style>
