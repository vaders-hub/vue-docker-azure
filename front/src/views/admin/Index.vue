<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Admin",

  setup() {
    return {};
  },
});
</script>

<template>
  <h2>Admin</h2>
  <div>admin page</div>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";
</style>
