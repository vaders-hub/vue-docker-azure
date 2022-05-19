<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'
import { useRouter } from 'vue-router'
import DxToolbar from 'devextreme-vue/toolbar'
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from 'devextreme-vue/form'
import DxButton from 'devextreme-vue/button'

export default defineComponent({
  components: {},
  setup(context) {
    const mainStore = useMainStore()
    const router = useRouter()

    const goHome = async () => {
      // await mainStore.login();
      router.push({ name: 'Home' })
    }

    return {
      goHome,
      router,
    }
  },
})
</script>
<template>
  <header class="header">
    <button @click="() => $router.push('/')">
      <img
        src="@/assets/images/dummy-gnb.gif"
        alt=""
        style="width: 100%; height: 80px"
      /><!-- dummy gnb -->
    </button>
  </header>
</template>
