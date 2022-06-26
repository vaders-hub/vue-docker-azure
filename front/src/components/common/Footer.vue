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
    }
  },
})
</script>
<template>
  <footer class="footer">
    <address class="company-info">
      <ul>
        <li>corp-이노베이션(주) 서울특별시  corp-빌딩</li>
        <li>대표이사 </li>
        <li>사업자등록번호</li>
        <li>전화</li>
      </ul>
    </address>
    <p class="copyright">© 2022 corp- innovation.Co.,Ltd</p>
  </footer>
</template>
