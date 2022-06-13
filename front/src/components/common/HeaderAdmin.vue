<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch, Ref } from 'vue'
import { hander } from '@/lib/index'
import { useMainStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderAdmin',
  components: {},
  setup(context) {
    const mainStore = useMainStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      hander.contentReady()
    })

    const goHome = () => {
      router.push({ path: '/' })
    }

    return {
      goHome,
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
      <div class="select-wrap select-company">
        <select>
          <option selected>SK이노베이션</option>
          <option>SK에너지</option>
          <option>SK지오센트릭</option>
          <option>SK루브리컨츠</option>
          <option>SK인천석유화학</option>
          <option>SK어스온</option>
          <option>SK온</option>
          <option>SK아이테크놀로지</option>
        </select>
      </div>
    </div>
  </header>
</template>
