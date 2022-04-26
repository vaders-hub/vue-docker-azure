<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import Test from '@/components/test/Test.vue'

export default defineComponent({
  name: 'Intro',
  components: {
    Test,
  },
  setup(context) {
    return {}
  },
})
</script>

<template>
  <h2>Intro</h2>
  <Test />
</template>
