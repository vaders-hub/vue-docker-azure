<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { hander } from '@/lib/index'
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

    onMounted(() => {
      hander.contentReady()
    })

    const goHome = async () => {
      // await mainStore.login();
      router.push({ path: '/' })
    }

    const onClickMenu = async (e) => {
      e.preventDefault()
      // await mainStore.login();
      router.push({ path: '/dashboard' })
    }

    return {
      goHome,
      onClickMenu,
      router,
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
      <!-- (js) btn-menu 활성화 시 .is-active 적용 -->
      <div class="header__util">
        <div class="user-info">
          <strong>SKI_김선경</strong>님<br />
          오늘도 좋은하루 되세요!
        </div>
        <!-- (js) btn-menu 활성화 시 aria-expanded="true" 적용 -->
        <button class="btn-menu" aria-haspopup="true" aria-expanded="false">
          <span class="hidden">View Menu</span>
        </button>
        <!-- (js) btn-menu 활성화 시 aria-hidden="false" 적용 -->
        <div class="menu" role="dialog" aria-hidden="true">
          <nav class="menu__inner">
            <div class="menu__user-info">안녕하세요, 김선경님</div>
            <div class="menu__pin">
              <button class="menu__pin-btn" type="button"><span class="hidden">pin</span></button>
            </div>
            <ul role="menubar">
              <li role="presentation">
                <!-- (js) 메뉴 활성화 시 .is-active 추가 -->
                <a
                  @click="onClickMenu($event)"
                  class="menu__depth1 menu__depth1--dashboard is-active"
                  href="#"
                  role="menuitem"
                  >Dashboard</a
                >
                <ul class="menu__depth2" role="menu">
                  <li role="presentation">
                    <!-- (D) 메뉴 활성화 시 .is-active 추가 -->
                    <a class="icon-company icon-company--ski is-active" href="#" role="menuitem"
                      ><span>SKI</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--ske" href="#" role="menuitem"
                      ><span>SKE(w/TI)</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skgc" href="#" role="menuitem"
                      ><span>SKGC</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--sko" href="#" role="menuitem"
                      ><span>SKO</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skl" href="#" role="menuitem"
                      ><span>SKL</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skipc" href="#" role="menuitem"
                      ><span>SKIPC</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skiet" href="#" role="menuitem"
                      ><span>SKIET</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skeo" href="#" role="menuitem"
                      ><span>SKEO</span></a
                    >
                  </li>
                </ul>
              </li>
              <li role="presentation">
                <a class="menu__depth1 menu__depth1--scope12" href="#" role="menuitem">Scope 1/2</a>
                <ul class="menu__depth2" role="menu">
                  <li role="presentation">
                    <!-- (D) 메뉴 활성화 시 .is-active 추가 -->
                    <a class="icon-company icon-company--ski" href="#" role="menuitem"
                      ><span>SKI</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--ske" href="#" role="menuitem"
                      ><span>SKE(w/TI)</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skgc" href="#" role="menuitem"
                      ><span>SKGC</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--sko" href="#" role="menuitem"
                      ><span>SKO</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skl" href="#" role="menuitem"
                      ><span>SKL</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skipc" href="#" role="menuitem"
                      ><span>SKIPC</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skiet" href="#" role="menuitem"
                      ><span>SKIET</span></a
                    >
                  </li>
                </ul>
              </li>
              <li role="presentation">
                <a class="menu__depth1 menu__depth1--scope3" href="#" role="menuitem">Scope 3</a>
                <ul class="menu__depth2" role="menu">
                  <li role="presentation">
                    <!-- (D) 메뉴 활성화 시 .is-active 추가 -->
                    <a class="icon-company icon-company--ski is-active" href="#" role="menuitem"
                      ><span>SKI</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--ske" href="#" role="menuitem"
                      ><span>SKE(w/TI)</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skgc" href="#" role="menuitem"
                      ><span>SKGC</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--sko" href="#" role="menuitem"
                      ><span>SKO</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skl" href="#" role="menuitem"
                      ><span>SKL</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skipc" href="#" role="menuitem"
                      ><span>SKIPC</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skiet" href="#" role="menuitem"
                      ><span>SKIET</span></a
                    >
                  </li>
                  <li role="presentation">
                    <a class="icon-company icon-company--skeo" href="#" role="menuitem"
                      ><span>SKEO</span></a
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <div class="menu__assessment">
              <a href="#">Assessment</a>
            </div>
          </nav>
          <button class="menu__close" type="button"><span class="hidden">menu close</span></button>
        </div>
      </div>
    </div>
  </header>
</template>
