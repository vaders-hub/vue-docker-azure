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
      'SK이노베이션',
      'SK에너지',
      'SK지오센트릭',
      'SK루브리컨츠',
      'SK인천석유화학',
      'SK어스온',
      'SK온',
      'SK아이테크놀로지',
    ])
    const selectedCompany = ref('SK이노베이션')

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
        <span class="lca-logo__image"><span class="hidden">SK 이노베이션</span></span>
        <span class="lca-logo__txt">LCA Infra</span>
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
