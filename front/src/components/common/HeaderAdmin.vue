<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch, Ref } from 'vue'
import { hander } from '@/lib/index'
import { useMainStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'
import SelectBox from '@/components/common/SelectBox.vue'

export default defineComponent({
  name: 'HeaderAdmin',
  components: { SelectBox },
  setup(context) {
    const mainStore = useMainStore()
    const route = useRoute()
    const router = useRouter()
    const companyList = ref([
      'corp-이노베이션',
      'corp-에너지',
      'corp-지오센트릭',
      'corp-루브리컨츠',
      'corp-인천석유화학',
      'corp-어스온',
      'corp-온',
      'corp-아이테크놀로지',
    ])
    const selectedCompany = ref('corp-이노베이션')

    onMounted(() => {
      hander.contentReady()
    })

    const goHome = () => {
      router.push({ path: '/' })
    }

    const selectChanged = (e) => {
      // console.log('selectChanged', e)
    }

    return {
      goHome,
      companyList,
      selectChanged,
      selectedCompany,
    }
  },
})
</script>
<template>
  <header class="header">
    <div class="header__inner">
      <strong class="lca-logo" @click="goHome">
        <span class="lca-logo__image"><span class="hidden">corp</span></span>
        <span class="lca-logo__txt">Infra</span>
      </strong>

      <div class="view-options-wrap">
        <div class="option-item__data">
          <SelectBox
            :selectData="companyList"
            v-model="selectedCompany"
            @selectChanged="selectChanged"
          />
        </div>
      </div>
    </div>
  </header>
</template>
