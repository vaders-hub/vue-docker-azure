<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'Admin',
  components: {
    RouterView,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <section class="contents">
    <h2>Admin</h2>
    <RouterView />
  </section>
</template>
