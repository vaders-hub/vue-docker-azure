<script lang="ts">
import { computed, defineComponent, onMounted, ref, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'
import { hander } from '@/lib/index'
import { useScope_1_2_store } from '@/store/scope_1_2'
import StackedBar from '@/components/chart/StackedBar.vue'
import DateSearchBox from '@/components/common/DateSearchBox.vue'
import type { DoughnutOptions, StackedBarOptions } from '@/interface/common'
import Doughnut from '../components/chart/Doughnut.vue'

export default defineComponent({
  name: 'Scope_3',
  components: { DateSearchBox },
  setup(context) {
    const mainStore = useMainStore()
    const current = mainStore.current
    const currentCompany = mainStore.company

    loadOptions()
    function loadOptions() {}

    const loadDatas = async () => {}

    // api 호출
    const onChangeMenu = async (company = 'ski') => {
      await console.log('call api >>>>', company)
    }

    const getStoreVisibility = computed(() => {
      return mainStore.layoutBlock[current]
    })

    const controllerFlag = ref(false)
    const toggleController = () => {
      controllerFlag.value = !controllerFlag.value
    }

    const onCloseController = () => {
      controllerFlag.value = false
    }

    onMounted(() => {
      hander.contentReady()
      onChangeMenu()
      loadDatas()
    })

    const corpNm = reactive<Record<string, unknown>>({ value: 'SKI' })

    // 회사 변경 감지
    watch(
      () => mainStore.company,
      (newVal, oldVal) => {
        onChangeMenu(newVal)
        corpNm.value = mainStore.corpArr[newVal]
      },
    )

    // 날짜 세팅
    const setDate = new Date()
    setDate.setMonth(setDate.getMonth() - 1)
    let sch_year = setDate.getFullYear()
    let sch_month = setDate.getMonth() + 1
    let sch_date = reactive({ sch_year, sch_month })

    function searchData(data) {
      sch_date.sch_year = data.yyyy
      sch_date.sch_month = data.mm
      sch_year = data.yyyy
      sch_month = data.mm
      chartData_reLoad()
    }

    function chartData_reLoad() {
      loadDatas()
    }

    return {
      searchData,
      currentCompany,
      sch_date,
      corpNm,
    }
  },
})
</script>

<template>
  <section class="contents">
    <div class="page-top">
      <div class="page-top__header">
        <h1 class="page-top__title">Scope 3</h1>
        <h2 class="page-top__sub-title">
          <strong v-html="corpNm.value"></strong
          ><span v-html="sch_date.sch_year + '.' + sch_date.sch_month" />
        </h2>
      </div>
      <div class="view-options">
        <DateSearchBox @click-event="searchData($event)" />
      </div>
    </div>

    <!-- Chart Grid -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <div
      class="lca-chart-grid swiper"
      data-options='{
      "slidesPerView": "1",
      "spaceBetween": 120,
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">카테고리별 Scope 3 배출량</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-1440x296.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">카테고리별 Scope 3 배출량</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-1440x296.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--// Chart Grid -->

    <!-- Chart Grid -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <div
      class="lca-chart-grid swiper"
      data-options='{
      "slidesPerView": "2",
      "spaceBetween": 120,
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Category별 배출 현황</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x414-2.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">사업회사별 Scope 3 배출 현황</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x414-2.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Category별 배출 현황</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x414-2.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">사업회사별 Scope 3 배출 현황</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x414-2.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--// Chart Grid -->

    <!-- Chart Grid -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <div
      class="lca-chart-grid swiper"
      data-options='{
      "slidesPerView": "2",
      "spaceBetween": 120,
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Cat 1 주요 배출 계수</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x296.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Cat 11 주요 배출 계수</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x296.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Cat 1 주요 배출 계수</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x296.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Cat 11 주요 배출 계수</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x296.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--// Chart Grid -->
  </section>
</template>
