<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/common/HeaderAdmin.vue'
import Footer from '@/components/common/FooterAdmin.vue'

export default defineComponent({
  name: 'Admin',
  components: {
    RouterView,
    Header,
    Footer,
  },
  setup(context) {
    let AppElement

    onMounted(() => {
      AppElement = document.querySelector('#app')

      if (AppElement) {
        AppElement.classList.add('wrap--admin')
      }
    })
    onUnmounted(() => {
      AppElement.classList.remove('wrap--admin')
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
