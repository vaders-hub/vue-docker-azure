<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'Main',
  components: { RouterView },
  setup(context) {},
})
</script>

<template>
  <RouterView />
</template>
