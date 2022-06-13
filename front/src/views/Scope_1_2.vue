<script lang="ts">
import { computed, defineComponent, onMounted, ref, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'
import { hander } from '@/lib/index'
import { useScope_1_2_store } from '@/store/scope_1_2'
import StackedBar from '@/components/chart/StackedBar.vue'
import LayoutController from '@/components/common/LayoutController.vue'
import DateSearchBox from '@/components/common/DateSearchBox.vue'
import type { DoughnutOptions, StackedBarOptions } from '@/interface/common'
import Doughnut from '../components/chart/Doughnut.vue'

export default defineComponent({
  name: 'Scope 1/2',
  components: { LayoutController, DateSearchBox, StackedBar, Doughnut },
  setup(props) {
    const mainStore = useMainStore()
    const current = mainStore.current
    const currentCompany = mainStore.company

    const scope_1_2_store = useScope_1_2_store()
    let scope_1_2_options, emitBySite_options
    loadOptions()
    function loadOptions() {
      scope_1_2_options = reactive<StackedBarOptions>({
        idName: 'scope_1_2_chart',
        series: [
          { value: 'scope1', name: 'scope1', color: '#E69B50' },
          { value: 'scope2', name: 'scope2', color: '#F3C848' },
        ],
        loadedData: [],
      })
      emitBySite_options = reactive<DoughnutOptions>({
        idName: 'emitBySite_options',
        series: [
          { value: 'Export', name: 'Export' },
          { value: 'Import', name: 'Import' },
        ],
        loadedData: [],
      })
    }

    const loadDatas = async () => {
      try {
        await scope_1_2_store.loadData('scope_1_2_data')
        scope_1_2_options.loadedData = scope_1_2_store.dataSet.scope_1_2_data

        await scope_1_2_store.loadData('emitBySite_data')
        emitBySite_options.loadedData = scope_1_2_store.dataSet.emitBySite_data
      } catch (e) {
        console.warn(e)
      }
    }

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
      getStoreVisibility,
      controllerFlag,
      toggleController,
      onCloseController,
      searchData,
      currentCompany,
      scope_1_2_options,
      emitBySite_options,
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
        <h1 class="page-top__title">Scope 1/2 <button @click="toggleController">toggle</button></h1>
        <h2 class="page-top__sub-title">
          <strong v-html="corpNm.value"></strong
          ><span v-html="sch_date.sch_year + '.' + sch_date.sch_month" />
        </h2>
      </div>
      <div class="view-options">
        <DateSearchBox @click-event="searchData($event)" />
      </div>
    </div>
    <LayoutController v-show="controllerFlag" @onCloseController="onCloseController" />
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
              <h3 class="lca-chart__title">Scope 1/2 배출량</h3>
            </div>
            <div class="lca-chart__area">
              <StackedBar :Options="scope_1_2_options" class="scope_1_2" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">사업장별 배출 현황</h3>
              <span class="lca-chart__unit">(단위 : MWh)</span>
            </div>
            <div class="lca-chart__area">
              <Doughnut :Options="emitBySite_options" class="scope_1_2" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">Scope 1/2 배출량</h3>
            </div>
            <div class="lca-chart__area"></div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">사업장별 배출 현황</h3>
              <span class="lca-chart__unit">(단위 : MWh)</span>
            </div>
            <div class="lca-chart__area"></div>
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
              <h3 class="lca-chart__title">배출활동별 배출 현황</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">사업장별 배출활동별 배출 현황</h3>
              <span class="lca-chart__unit">(단위 : MWh)</span>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">배출활동별 배출 현황</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">사업장별 배출활동별 배출 현황</h3>
              <span class="lca-chart__unit">(단위 : MWh)</span>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
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
              <h3 class="lca-chart__title">공정별 배출량</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">주요 배출 계수</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-3.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">공정별 배출량</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
            </div>
          </div>
          <div class="swiper-slide lca-chart">
            <div class="lca-chart__title-wrap">
              <h3 class="lca-chart__title">주요 배출 계수</h3>
            </div>
            <div class="lca-chart__area">
              <img src="@/assets/images/dummy-chart-660x390-3.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--// Chart Grid -->
  </section>
</template>
