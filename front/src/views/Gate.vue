<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { hander } from '@/lib/index'

export default defineComponent({
  name: 'Scope_3',
  components: {},
  setup(context) {
    const router = useRouter()

    onMounted(() => {
      hander.contentReady()
    })

    const onClickMenu = async (e, url) => {
      e.preventDefault()
      router.push({ path: `/${url}` })
    }
    return {
      onClickMenu,
    }
  },
})
</script>

<template>
  <div class="wrap">
    <!-- (js) .bg-full 영역에서만 header--transparent 클래스 추가 -->
    <header class="header header--transparent">
      <div class="header__inner">
        <strong class="lca-logo">
          <span class="lca-logo__image"><span class="hidden">SK 이노베이션</span></span>
          <span class="lca-logo__txt">LCA Infra</span>
        </strong>
        <div class="header__util">
          <div class="user-info">
            <strong>SKI_김선경</strong>님<br />
            오늘도 좋은하루 되세요!
          </div>
        </div>
      </div>
    </header>

    <div class="gateway bg-full">
      <div class="gateway__menu">
        <!-- (js) default class 추가 없음,  hover 시 .expand 추가, 나머지 a.gateway__link .reduce 추가 -->
        <a
          href="#"
          class="gateway__link gateway__link--monitoring"
          @click="onClickMenu($event, 'storyline')"
        >
          <span class="gateway__txt">
            <span class="gateway__desc"
              >우리가 배출하는 온실가스 뿐만 아니라 <br />Net Zero를 추구하고자 합니다.</span
            >
            <strong class="gateway__tit">MONITORING</strong>
          </span>
        </a>
        <a
          href="#"
          class="gateway__link gateway__link--assessment"
          @click="onClickMenu($event, 'assessment')"
        >
          <span class="gateway__txt"
            ><span class="gateway__desc"
              >'기후변화'에 적극적으로 대응하기 위한 <br />자체 평가를 실시합니다.</span
            ><strong class="gateway__tit">ASSESSMENT</strong></span
          >
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header__inner {
  background: none !important;
}
</style>
