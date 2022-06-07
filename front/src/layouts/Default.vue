<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, reactive, watch } from 'vue'
import { RouterView } from 'vue-router'

import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'

export default defineComponent({
  name: 'Default',
  components: {
    Header,
    Footer,
    RouterView,
  },
  setup(context) {
    let AppElement
    onMounted(() => {
      AppElement = document.querySelector('#app')

      if (AppElement) {
        AppElement.classList.add('wrap')
      }
    })
    return {}
  },
})
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
