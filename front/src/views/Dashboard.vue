<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { hander } from '@/lib/index'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'
import Bar from '@/components/chart/Bar.vue'
import Pie from '@/components/chart/Pie.vue'
import WorldMap from '@/components/chart/WorldMap.vue'
import StackedBar from '@/components/chart/StackedBar.vue'
import 'devextreme/dist/css/dx.light.css'
// import { DxSelectBox } from 'devextreme-vue/select-box'
import SelectBox from '../components/common/SelectBox.vue'
import type {
  LineOptions,
  BarOptions,
  PieOptions,
  StackedBarOptions,
  PolygonalLineOptions,
} from '@/interface/common'

import 'devextreme/dist/css/dx.light.css'
import PolygonalLine from '../components/chart/PolygonalLine.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Line,
    Bar,
    Pie,
    WorldMap,
    StackedBar,
    SelectBox,
    PolygonalLine,
  },
  setup(context) {
    // 날짜 세팅
    const setDate = new Date()
    setDate.setMonth(setDate.getMonth() - 1)
    let sch_year = setDate.getFullYear()
    let sch_month = setDate.getMonth() + 1
    let yearOption: any = []
    let monthOption: any = []
    dateSetting()

    const dashboardStore = useDashboardStore()
    const worldEmmit_data = []
    const lineOptions = reactive<LineOptions>({
      idName: 'line-demo',
      series: [
        { value: 'hydro', name: 'Hydro-electric', color: 'red' },
        { value: 'oil', name: 'Oil', color: 'black' },
        { value: 'gas', name: 'Natural gas', color: 'grey' },
        { value: 'coal', name: 'Coal', color: 'blue' },
      ],
      loadedData: [],
    })
    const scope_1_2_options = reactive<BarOptions>({
      idName: 'scope_1_2_chart',
      series: [
        { value: 'scope1', name: 'scope1', color: '#E8E5D3' },
        { value: 'scope2', name: 'scope2', color: '#F3C848' },
      ],
      loadedData: [],
    })
    const scope_3_options = reactive<BarOptions>({
      idName: 'scope_3_chart',
      series: [{ value: 'scope3', name: 'scope3', color: '#E8E5D3' }],
      loadedData: [],
    })
    const site_options = reactive<PieOptions>({
      idName: 'site_chart',
      series: [{ value: 'compNm', name: 'compNm' }],
      loadedData: [],
    })
    const cate_options = reactive<PieOptions>({
      idName: 'cate_chart',
      series: [{ value: 'scope3', name: 'Scope3' }],
      loadedData: [],
    })
    const stacked1_options = reactive<StackedBarOptions>({
      idName: 'stack_chart',
      series: [
        { value: 'scope12', name: 'scope12', color: '#E69B50' },
        { value: 'scope3', name: 'scope3', color: '#F3C848' },
      ],
      loadedData: [],
    })
    const stacked2_options = reactive<StackedBarOptions>({
      idName: 'stack_chart',
      series: [
        { value: 'scope12', name: 'scope12', color: '#E69B50' },
        { value: 'scope3', name: 'scope3', color: '#F3C848' },
      ],
      loadedData: [],
    })
    const majorPrcTrend_Options = reactive<PolygonalLineOptions>({
      idName: 'majorPrcTrend_chart',
      series: [
        {
          value: 'REC',
          name: 'REC',
          color: 'red',
          point: { shape: 'triangleDown', color: 'pink' },
        },
        {
          value: 'KAU21',
          name: 'KAU21',
          color: 'green',
          point: { shape: 'polygon', color: 'blue' },
        },
        {
          value: 'EU_ETS',
          name: 'EU-ETS',
          color: 'grey',
          point: { shape: 'circle', color: 'black' },
        },
      ],
      loadedData: [],
    })

    const loadDatas = async () => {
      try {
        await dashboardStore.loadData('worldEmmit_data', sch_year, sch_month)
        dashboardStore.dataSet.worldEmmit_data

        await dashboardStore.loadData('line', sch_year, sch_month)
        lineOptions.loadedData = dashboardStore.dataSet.line

        await dashboardStore.loadData('scope_1_2_data', sch_year, sch_month)
        scope_1_2_options.loadedData = dashboardStore.dataSet.scope_1_2_data

        await dashboardStore.loadData('scope_3_data', sch_year, sch_month)
        scope_3_options.loadedData = dashboardStore.dataSet.scope_3_data

        await dashboardStore.loadData('site_data', sch_year, sch_month)
        site_options.loadedData = dashboardStore.dataSet.site_data

        await dashboardStore.loadData('cate_data', sch_year, sch_month)
        cate_options.loadedData = dashboardStore.dataSet.cate_data

        await dashboardStore.loadData('stacked1_data', sch_year, sch_month)
        stacked1_options.loadedData = dashboardStore.dataSet.stacked1_data

        await dashboardStore.loadData('stacked2_data', sch_year, sch_month)
        stacked2_options.loadedData = dashboardStore.dataSet.stacked2_data

        await dashboardStore.loadData('majorPrcTrend_data', sch_year, sch_month)
        majorPrcTrend_Options.loadedData = dashboardStore.dataSet.majorPrcTrend_data
      } catch (e) {
        console.warn(e)
      }
    }

    onMounted(() => {
      hander.contentReady()

      loadDatas()
    })

    // 년/월 SELECT-BOX 세팅
    function dateSetting() {
      for (let i = sch_year; i > sch_year - 10; i--) {
        let dateOption = { id: i, name: i + '년' }
        yearOption.push(dateOption)
      }
      for (let i = 1; i < 13; i++) {
        let dateOption = { id: i, name: i + '월' }
        monthOption.push(dateOption)
      }
    }

    function yearValChanged(e) {
      sch_year = e
    }

    function monthValChanged(e) {
      sch_month = e
    }

    // 검색(확인)
    function serachBtn() {
      dashboardStore.dataSet.worldEmmit_data = []
      dashboardStore.dataSet.line = []
      dashboardStore.dataSet.scope_1_2_data = []
      dashboardStore.dataSet.scope_3_data = []
      dashboardStore.dataSet.site_data = []
      dashboardStore.dataSet.cate_data = []
      dashboardStore.dataSet.stacked1_data = []
      dashboardStore.dataSet.stacked2_data = []
      dashboardStore.dataSet.polygonalLine_Options = []
      loadDatas()
    }

    return {
      worldEmmit_data,
      lineOptions,
      scope_1_2_options,
      scope_3_options,
      site_options,
      cate_options,
      stacked1_options,
      stacked2_options,
      sch_year,
      yearOption,
      yearValChanged,
      sch_month,
      monthOption,
      monthValChanged,
      serachBtn,
      SelectBox,
      majorPrcTrend_Options,
    }
  },
})
</script>

<template>
  <section class="contents">
    <div class="page-top">
      <div class="page-top__header">
        <h1 class="page-top__title">Dashboard</h1>
        <h2 class="page-top__sub-title">
          <strong>SK 이노베이션</strong><span>{{ sch_year }}.{{ sch_month }}</span>
        </h2>
      </div>
      <div class="view-options">
        <div class="view-options-wrap">
          <SelectBox
            :selectData="yearOption"
            @selectChanged="yearValChanged"
            :value="sch_year"
            value-expr="id"
            display-expr="name"
          />
          <SelectBox
            :selectData="monthOption"
            @selectChanged="monthValChanged"
            :value="sch_month"
            value-expr="id"
            display-expr="name"
          />
          <!-- <DxSelectBox
            :data-source="yearOption"
            :value="sch_year"
            v-model="sch_year"
            value-expr="id"
            display-expr="name"
            @value-changed="yearValChanged"
          />
          <DxSelectBox
            :data-source="monthOption"
            :value="sch_month"
            v-model="sch_month"
            value-expr="id"
            display-expr="name"
            @value-changed="monthValChanged"
          /> -->
          <div class="view-options__btn">
            <button class="btn" @click="serachBtn">확인</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Information -->
    <!-- div.summary-info__item 개수가 4개 이하 일 경우 .swiper 클래스 삭제 -->
    <div
      class="summary-info swiper"
      data-options='{
      "slidesPerView": "4",
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide summary-info__item">
            <div class="summary-info__inner">
              <strong class="summary-info__title">총 배출량</strong>
              <div class="summary-info__value">
                <span class="summary-info__unit">단위 : ktCO2e</span>
                <em class="summary-info__value-txt">119,871</em>
              </div>
              <ul>
                <li><span>전월</span><strong>118,871</strong></li>
                <li><span>작년 동월</span><strong>119,871</strong></li>
              </ul>
            </div>
          </div>
          <div class="swiper-slide summary-info__item">
            <div class="summary-info__inner">
              <strong class="summary-info__title">Scope 1/2</strong>
              <div class="summary-info__value">
                <span class="summary-info__unit">단위 : ktCO2e</span>
                <em class="summary-info__value-txt">8,097</em>
              </div>
              <ul>
                <li><span>전월</span><strong>8,097</strong></li>
                <li><span>작년 동월</span><strong>8,097</strong></li>
              </ul>
            </div>
          </div>
          <div class="swiper-slide summary-info__item">
            <div class="summary-info__inner">
              <strong class="summary-info__title">Scope 3</strong>
              <div class="summary-info__value">
                <span class="summary-info__unit">단위 : ktCO2e</span>
                <em class="summary-info__value-txt">111,774</em>
              </div>
              <ul>
                <li><span>전월</span><strong>111,774</strong></li>
                <li><span>작년 동월</span><strong>111,774</strong></li>
              </ul>
            </div>
          </div>
          <div class="swiper-slide summary-info__item">
            <div class="summary-info__inner">
              <strong class="summary-info__title">Financial Intensity</strong>
              <div class="summary-info__value">
                <span class="summary-info__unit">단위 : ktCO2e</span>
                <em class="summary-info__value-txt">119,871</em>
              </div>
              <ul>
                <li><span>전월</span><strong>119,871</strong></li>
                <li><span>작년 동월</span><strong>119,871</strong></li>
              </ul>
            </div>
          </div>
          <div class="swiper-slide summary-info__item">
            <div class="summary-info__inner">
              <strong class="summary-info__title">All Time Net Zero</strong>
              <div class="summary-info__value">
                <span class="summary-info__unit">단위 : ktCO2e</span>
                <em class="summary-info__value-txt">119,871</em>
              </div>
              <ul>
                <li><span>전월</span><strong>118,871</strong></li>
                <li><span>작년 동월</span><strong>119,871</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--// Information -->

    <!-- Chart Map -->
    <div class="lca-chart-grid">
      <div class="lca-chart lca-chart--map">
        <div class="lca-chart__title-wrap">
          <h3 class="lca-chart__title">국가별 총 배출량</h3>
          <span class="lca-chart__unit">(단위 : MWh)</span>
        </div>
        <div class="lca-chart__area">
          <WorldMap v-bind="worldEmmit_data" />
          <!-- <img src="@/assets/images/dummy-chart-1440x710.gif" alt="" /> -->
        </div>
      </div>
    </div>
    <!--// Chart Map -->

    <!-- Chart Grid_row_1 -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <div
      class="lca-chart-grid swiper"
      data-options='{
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장/Site별 배출현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <Pie :Options="site_options" v-model="sch_year" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출현황</h3>
              </div>
              <div class="lca-chart__area">
                <Pie :Options="site_options" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">카테고리별 배출현황</h3>
              </div>
              <div class="lca-chart__area">
                <Pie :Options="cate_options" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장/Site별 배출현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출현황</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">카테고리별 배출현황</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <!--// Chart Grid -->

    <!-- Chart Grid -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <div
      class="lca-chart-grid swiper"
      data-options='{
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 1/2 vs Net-Zero Target 월간 배출량 비교</h3>
              </div>
              <ul class="lca-chart__monthly-data">
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value increase"
                    ><span title="증가">▲</span>120</strong
                  >
                </li>
                <li>
                  <span>월간 평균치</span><strong class="lca-chart__monthly-value">100</strong>
                </li>
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value decrease"
                    ><span title="감소">▼</span>92</strong
                  >
                </li>
              </ul>
              <div class="lca-chart__area">
                <Bar :Options="scope_1_2_options" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 3 vs Net-Zero Target 월간 배출량 비교</h3>
              </div>
              <ul class="lca-chart__monthly-data">
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value increase"
                    ><span title="증가">▲</span>1,308</strong
                  >
                </li>
                <li>
                  <span>월간 평균치</span><strong class="lca-chart__monthly-value">1,100</strong>
                </li>
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value decrease"
                    ><span title="감소">▼</span>1,017</strong
                  >
                </li>
              </ul>
              <div class="lca-chart__area">
                <Bar :Options="scope_3_options" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 1/2 vs Net-Zero Target 월간 배출량 비교</h3>
              </div>
              <ul class="lca-chart__monthly-data">
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value increase"
                    ><span title="증가">▲</span>120</strong
                  >
                </li>
                <li>
                  <span>월간 평균치</span><strong class="lca-chart__monthly-value">100</strong>
                </li>
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value decrease"
                    ><span title="감소">▼</span>92</strong
                  >
                </li>
              </ul>
              <div class="lca-chart__area">
                <Line :Options="lineOptions" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 3 vs Net-Zero Target 월간 배출량 비교</h3>
              </div>
              <ul class="lca-chart__monthly-data">
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value increase"
                    ><span title="증가">▲</span>1,308</strong
                  >
                </li>
                <li>
                  <span>월간 평균치</span><strong class="lca-chart__monthly-value">1,100</strong>
                </li>
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value decrease"
                    ><span title="감소">▼</span>1,017</strong
                  >
                </li>
              </ul>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x336.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 1/2 vs Net-Zero Target 월간 배출량 비교</h3>
              </div>
              <ul class="lca-chart__monthly-data">
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value increase"
                    ><span title="증가">▲</span>120</strong
                  >
                </li>
                <li>
                  <span>월간 평균치</span><strong class="lca-chart__monthly-value">100</strong>
                </li>
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value decrease"
                    ><span title="감소">▼</span>92</strong
                  >
                </li>
              </ul>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x336.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 3 vs Net-Zero Target 월간 배출량 비교</h3>
              </div>
              <ul class="lca-chart__monthly-data">
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value increase"
                    ><span title="증가">▲</span>1,308</strong
                  >
                </li>
                <li>
                  <span>월간 평균치</span><strong class="lca-chart__monthly-value">1,100</strong>
                </li>
                <li>
                  <span>월간 최고치</span
                  ><strong class="lca-chart__monthly-value decrease"
                    ><span title="감소">▼</span>1,017</strong
                  >
                </li>
              </ul>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x336.gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <!--// Chart Grid -->

    <!-- Chart Grid -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <!-- <div
      class="lca-chart-grid swiper"
      data-options='{
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출현황</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">카테고리별 배출현황</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출현황</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">카테고리별 배출현황</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출현황</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">카테고리별 배출현황</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div> -->
    <!--// Chart Grid -->

    <!-- Chart Grid -->
    <!-- div.swiper-slide 개수가 1개 일 경우 .swiper 클래스 삭제 -->
    <div
      class="lca-chart-grid swiper"
      data-options='{
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">
            <div class="lca-chart lca-chart--wide">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Avoided Emission</h3>
              </div>
              <div class="lca-chart__area-wrap">
                <div class="lca-chart__area" style="float: left">
                  <StackedBar :Options="stacked1_options" />
                </div>
                <div class="lca-chart__area" style="float: left; padding-left: 50px">
                  <StackedBar :Options="stacked2_options" />
                </div>
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 가격 트렌드</h3>
              </div>
              <div class="lca-chart__area">
                <PolygonalLine :Options="majorPrcTrend_Options" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart lca-chart--wide">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Avoided Emission</h3>
              </div>
              <div class="lca-chart__area-wrap">
                <div class="lca-chart__area"></div>
                <div class="lca-chart__area"></div>
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 가격 트렌드</h3>
              </div>
              <div class="lca-chart__area"></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart lca-chart--wide">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Avoided Emission</h3>
              </div>
              <div class="lca-chart__area-wrap">
                <div class="lca-chart__area">
                  <!-- <img src="@/assets/images/dummy-chart-400x414.gif" alt="" /> -->
                </div>
                <div class="lca-chart__area">
                  <!-- <img src="@/assets/images/dummy-chart-400x414.gif" alt="" /> -->
                </div>
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 가격 트렌드</h3>
              </div>
              <div class="lca-chart__area">
                <!-- <img src="@/assets/images/dummy-chart-400x414-2.gif" alt="" /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <!--// Chart Grid -->
  </section>
</template>
