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
        <li>SK이노베이션(주) 서울특별시 종로구 종로 26 SK빌딩</li>
        <li>대표이사 김준</li>
        <li>사업자등록번호 101-86-32319</li>
        <li>전화 02-2121-5114</li>
      </ul>
    </address>
    <p class="copyright">© 2022 SK innovation.Co.,Ltd</p>
  </footer>
</template>
