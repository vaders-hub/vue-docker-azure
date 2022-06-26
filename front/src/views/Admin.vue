<script lang="ts">
import { defineComponent, onMounted, reactive, ref, inject } from 'vue'
import DashboardManagement from '@/components/admin/DashboardManagement.vue'
import DiagramManagement from '@/components/admin/DiagramManagement.vue'

export default defineComponent({
  name: 'Admin',
  components: { DashboardManagement, DiagramManagement },
  setup() {
    const compName = ref('DashboardManagement')
    const Tabs = reactive([
      { name: 'Dashboard Management', active: true, value: 'DashboardManagement' },
      { name: 'Diagram Management', active: false, value: 'DiagramManagement' },
    ])
    const onClickTab = (idx) => {
      Tabs.forEach((v, i) => {
        v.active = false
        if (idx === i) {
          v.active = true
          compName.value = v.value
        }
      })
    }

    return { compName, Tabs, onClickTab }
  },
})
</script>

<template>
  <section class="contents contents--admin">
    <h1 class="admin-title">Admin</h1>
    <div class="contents">
      <div class="lca-tab">
        <ul>
          <li
            v-for="(item, index) in Tabs"
            :key="index"
            :class="`${item.active === true ? 'is-active' : ''}`"
          >
            <a href="#" @click="onClickTab(index)"
              ><span>{{ item.name }}</span></a
            >
          </li>
        </ul>
      </div>
      <component :is="compName" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
.contents {
  padding: 40px 0;
  .admin-title {
    margin-bottom: 0;
  }
}
</style>
