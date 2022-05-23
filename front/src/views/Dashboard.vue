<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { hander } from '@/lib/index'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'
import Scope_1_2 from '@/components/chart/Scope_1_2.vue'
import Scope_3 from '@/components/chart/Scope_3.vue'
import Site from '@/components/chart/Site.vue'
import Cate from '@/components/chart/Cate.vue'
import type { LineOptions } from '@/interface/common'
import type { BarOptions } from '@/interface/common'
import type { SiteOptions } from '@/interface/common'
import type { PieOptions } from '@/interface/common'

import 'devextreme/dist/css/dx.light.css'
import WorldMap from '../components/chart/WorldMap.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Line,
    Scope_1_2,
    Scope_3,
    Site,
    Cate,
    WorldMap,
  },
  data() {
    return {
      std_year: '2022',
    }
  },
  setup(context) {
    const dashboardStore = useDashboardStore()
    const lineOptions = reactive<LineOptions>({
      idName: 'line-demo',
      series: [
        { value: 'hydro', name: 'Hydro-electric' },
        { value: 'oil', name: 'Oil' },
        { value: 'gas', name: 'Natural gas' },
        { value: 'coal', name: 'Coal' },
      ],
      loadedData: [],
    })
    const scope_1_2_data = reactive<BarOptions>({
      idName: 'scope_1_2',
      series: [
        { value: 'scope1', name: 'Scope1' },
        { value: 'scope2', name: 'Scope2' },
      ],
      loadedData: [],
    })
    const scope_3_data = reactive<BarOptions>({
      idName: 'scope_3',
      series: [{ value: 'scope3', name: 'Scope3' }],
      loadedData: [],
    })
    const site_data = reactive<SiteOptions>({
      idName: 'site',
      series: [{ value: 'compNm', name: 'compNm' }],
      loadedData: [],
    })
    const cate_data = reactive<PieOptions>({
      idName: 'cate',
      series: [{ value: 'scope3', name: 'Scope3' }],
      loadedData: [],
    })

    const loadDatas = async () => {
      try {
        await dashboardStore.loadData('line')
        lineOptions.loadedData = dashboardStore.dataSet.line

        await dashboardStore.loadData('scope_1_2_data')
        scope_1_2_data.loadedData = dashboardStore.dataSet.scope_1_2_data

        await dashboardStore.loadData('scope_3_data')
        scope_3_data.loadedData = dashboardStore.dataSet.scope_3_data

        await dashboardStore.loadData('site_data')
        site_data.loadedData = dashboardStore.dataSet.site_data

        await dashboardStore.loadData('cate_data')
        cate_data.loadedData = dashboardStore.dataSet.cate_data
      } catch (e) {
        console.warn(e)
      }
    }

    onMounted(() => {
      hander.contentReady()
      loadDatas()
    })

    return { lineOptions, scope_1_2_data, scope_3_data, site_data, cate_data }
  },
})
</script>

<template>
  <section class="contents">
    <div class="page-top">
      <div class="page-top__header">
        <h1 class="page-top__title">Dashboard</h1>
        <h2 class="page-top__sub-title"><strong>SK 이노베이션</strong><span>2022.04</span></h2>
      </div>
      <div class="view-options">
        <div class="view-options-wrap">
          <div class="view-options__year select-wrap">
            <select
              v-model="std_year"
              data-options='{
              "maxHeight": "226",
              "msg": "년도"
              }'
            >
              <option value="2020">2020년</option>
              <option value="2021">2021년</option>
              <option value="2022">2022년</option>
            </select>
          </div>
          <div class="view-options__month select-wrap">
            <select
              data-options='{
              "maxHeight": "226",
              "msg": "월"
              }'
            >
              <option>1월</option>
              <option>2월</option>
              <option>3월</option>
              <option>4월</option>
              <option>5월</option>
              <option>6월</option>
              <option>7월</option>
              <option>8월</option>
              <option>9월</option>
              <option>10월</option>
              <option>11월</option>
              <option>12월</option>
            </select>
          </div>
          <div class="view-options__btn">
            <button class="btn">확인</button>
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
          <WorldMap />
          <!-- <img src="@/assets/images/.gif" alt=""> -->
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
                <Site :Options="site_data" />
              </div>
            </div>
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
              <div class="lca-chart__area">
                <Cate :Options="cate_data" />
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
      <div class="swiper-pagination"></div>
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
                <Scope_1_2 :Options="scope_1_2_data" />
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
                <Scope_3 :Options="scope_3_data" />
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
      <div class="swiper-pagination"></div>
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
            <div class="lca-chart lca-chart--wide">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Avoided Emission</h3>
              </div>
              <div class="lca-chart__area-wrap">
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
                </div>
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 가격 트렌드</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-400x414-2.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart lca-chart--wide">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Avoided Emission</h3>
              </div>
              <div class="lca-chart__area-wrap">
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
                </div>
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 가격 트렌드</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-400x414-2.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart lca-chart--wide">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Avoided Emission</h3>
              </div>
              <div class="lca-chart__area-wrap">
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-400x414.gif" alt="" />
                </div>
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 가격 트렌드</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-400x414-2.gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--// Chart Grid -->
  </section>
</template>
