<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import Header from '@/components/common/Header.vue'
import Drawer from 'devextreme-vue/drawer'
import SideBarAdmin from '@/components/common/SideBarAdmin.vue'
import ScrollView from 'devextreme-vue/scroll-view'

export default defineComponent({
  name: 'Admin',
  components: {
    Header,
    Drawer,
    SideBarAdmin,
    ScrollView,
  },
  setup(context) {
    return {}
  },
})
</script>

<template>
  <Header />
  <Drawer>
    <SideBarAdmin />
    <ScrollView><RouterView /></ScrollView>
  </Drawer>
</template>
