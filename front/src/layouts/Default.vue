<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default defineComponent({
  name: "Default",
  components: {
    Header,
    Footer
  },
  setup(context) {
    return {};
  },
});
</script>

<template>
  <Header/>
  <RouterView />
  <Footer/>
</template>
