<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch, Ref } from 'vue'
import { hander } from '@/lib/index'
import { useMainStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  setup(context) {
    const mainStore = useMainStore()
    const route = useRoute()
    const router = useRouter()
    const hFlag = ref(true)

    const menuDepth1 = reactive([
      { name: 'Dashboard', active: 'is-active', class: 'dashboard' },
      { name: 'Scope 1/2', active: '', class: 'scope12' },
      { name: 'Scope 3', active: '', class: 'scope3' },
    ])
    const MenuDepth2 = reactive([
      { name: 'SKI', active: '', class: 'ski' },
      { name: 'SKE(w/TI)', active: '', class: 'ske' },
      { name: 'SKGC', active: '', class: 'skgc' },
      { name: 'SKO', active: '', class: 'sko' },
      { name: 'SKL', active: '', class: 'skl' },
      { name: 'SKIPC', active: '', class: 'skipc' },
      { name: 'SKIET', active: '', class: 'skiet' },
      { name: 'SKEO', active: '', class: 'skeo' },
    ])

    onMounted(() => {
      hander.contentReady()
    })

    const goHome = () => {
      // await mainStore.login();
      router.push({ path: '/' })
    }

    const gotoMonitoring = (e) => {
      e.preventDefault()
      router.push({ path: '/storyline' })
    }

    const gotoAdmin = (e) => {
      e.preventDefault()
      router.push({ path: '/admin' })
    }

    // 1 뎁스 메뉴
    const onClickMenu = async (e, idx) => {
      e.preventDefault()

      menuDepth1.forEach((v, i) => {
        i === idx ? (v.active = '') : (v.active = 'is-active')
      })
      MenuDepth2.forEach((v) => (v.active = ''))
      MenuDepth2[0].active = 'is-active'
      router.push({ name: `${menuDepth1[idx].name}`, params: { target: MenuDepth2[0].class } })
    }

    const selectedIcon = ref<HTMLAnchorElement[]>([])

    // 회사 아이콘 + 평가
    const onClickNavigate = async (e, idx?, sidx?) => {
      e.preventDefault()

      // 평가로 이동
      if (typeof idx !== 'number') {
        router.push({ name: 'Assessment' })
      }

      if (typeof idx === 'number') {
        MenuDepth2.forEach((v) => (v.active = ''))
        MenuDepth2[sidx].active = 'is-active'
        mainStore.changeCompany(MenuDepth2[sidx].class)
        router.push({ name: `${menuDepth1[idx].name}`, params: { target: MenuDepth2[sidx].class } })
      }
    }

    watch(
      () => mainStore.current,
      (newVal, oldVal) => {
        newVal === 'assessment' ? (hFlag.value = false) : (hFlag.value = true)
        // 1 뎁스 메뉴 하이라이팅
        menuDepth1.forEach((v) => {
          if (v.class === newVal) {
            v.active = 'is-active'
            MenuDepth2[0].active = 'is-active'
            mainStore.changeCompany(MenuDepth2[0].class)
            // router.push({ name: `${v.name}`, params: { target: MenuDepth2[0].class } })
          } else {
            v.active = ''
          }
        })
      },
    )

    return {
      goHome,
      gotoMonitoring,
      gotoAdmin,
      menuDepth1,
      MenuDepth2,
      onClickMenu,
      onClickNavigate,
      router,
      hFlag,
      selectedIcon,
    }
  },
})
</script>
<template>
  <header class="header">
    <div class="header__inner">
      <strong class="lca-logo" @click="goHome">
        <span class="lca-logo__image"><span class="hidden">K</span></span>
        <span class="lca-logo__txt"></span>
      </strong>
      <!-- (js) btn-menu 활성화 시 .is-active 적용 -->
      <div class="header__util">
        <a v-show="!hFlag" href="#" @click="gotoMonitoring" class="btn-monitoring">Monitoring</a>
        <div class="user-info">
          <strong></strong>님 {{ hFlag }}<br />
          오늘도 좋은하루 되세요!
        </div>
        <!-- (js) btn-menu 활성화 시 aria-expanded="true" 적용 -->
        <button v-show="hFlag" class="btn-menu">
          <span class="hidden">View Menu</span>
        </button>
        <!-- (js) btn-menu 활성화 시 aria-hidden="false" 적용 -->
        <div class="menu" role="dialog">
          <nav class="menu__inner">
            <div class="menu__user-info">안녕하세요, 님</div>
            <div class="menu__util">
              <button
                @click="gotoAdmin"
                class="menu__util-btn menu__util-btn--setting"
                type="button"
              >
                <span class="hidden">setting</span>
              </button>
              <button class="menu__util-btn menu__util-btn--pin" type="button">
                <span class="hidden">pin</span>
              </button>
            </div>
            <ul role="menubar">
              <li v-for="(title, tid) in menuDepth1" :key="tid" role="presentation">
                <!-- (js) 메뉴 활성화 시 .is-active 추가 -->
                <a
                  @click="onClickMenu($event, tid)"
                  :class="`menu__depth1 menu__depth1--${title.class} ${title.active}`"
                  href="#"
                  role="menuitem"
                  >{{ title.name }}</a
                >
                <ul class="menu__depth2" role="menu">
                  <li v-for="(item, index) in MenuDepth2" :key="index" role="presentation">
                    <a
                      @click="onClickNavigate($event, tid, index)"
                      :class="`icon-company icon-company--${item.class} ${item.active}`"
                      href="#"
                      role="menuitem"
                      ref="selectedIcon"
                      ><span>{{ item.name }}</span></a
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <div class="menu__assessment">
              <a @click="onClickNavigate($event)" href="#">Assessment</a>
            </div>
          </nav>
          <button class="menu__close" type="button"><span class="hidden">menu close</span></button>
        </div>
      </div>
    </div>
  </header>
</template>
