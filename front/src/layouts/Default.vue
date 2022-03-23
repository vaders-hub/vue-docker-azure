<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";
import Drawer from "devextreme-vue/drawer";
import ScrollView from "devextreme-vue/scroll-view";

export default defineComponent({
  name: "Default",
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
  <Header />
  <Drawer>
    <SideBar />
    <ScrollView><RouterView /></ScrollView>
  </Drawer>
</template>
