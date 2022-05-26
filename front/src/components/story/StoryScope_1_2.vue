<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'
import Bar from '@/components/chart/Bar.vue'

import type { LineOptions, BarOptions } from '@/interface/common'

export default defineComponent({
  name: 'Scope12',
  props: {
    current: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Line,
    Bar,
  },
  setup(props) {
    let chartData = reactive(props.current)
    const loadChartData = async () => {
      const param = JSON.parse(JSON.stringify(chartData))[0]

      try {
        await dashboardStore.loadData('line')
        lineOptions.loadedData = dashboardStore.dataSet.line

        await dashboardStore.loadData('scope_1_2_data')
        barOptions.loadedData = dashboardStore.dataSet.scope_1_2_data
      } catch (e) {
        console.warn(e)
      }
    }
    const dashboardStore = useDashboardStore()
    const lineOptions = reactive<LineOptions>({
      idName: 'chart-demo-story',
      series: [
        { value: 'hydro', name: 'Net Zero Target' },
        { value: 'oil', name: '월별 배출량 ' },
        { value: 'gas', name: '할당 배출량' },
        { value: 'coal', name: '누적 배출량' },
      ],
      loadedData: [],
    })
    const barOptions = reactive<BarOptions>({
      idName: 'scope_1_2',
      series: [
        { value: 'scope1', name: 'scope1', color: '#E8E5D3' },
        { value: 'scope2', name: 'scope2', color: '#F3C848' },
      ],
      loadedData: [],
    })

    watch(
      () => props.current,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          chartData = newVal
          loadChartData()
        }
      },
    )

    onMounted(() => {
      loadChartData()
    })

    return { lineOptions, barOptions }
  },
})
</script>
<template>
  <div class="storyline__chart">
    <h3 class="hidden">SKI</h3>
    <div class="contents">
      <!-- div.swiper-slide 개수가 2개 이상일 경우 .swiper 클래스 추가 -->
      <div
        class="lca-chart-grid"
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
                  <h4 class="lca-chart__title">Scope 1/2 계획 vs 배출량</h4>
                </div>
                <div class="lca-chart__area">
                  <Line :Options="lineOptions" />
                  <!-- <img src="@/assets/images/dummy-chart-920x416.png" alt="" /> -->
                </div>
              </div>
              <!-- (D) 주요공정 차트가 없는 OC 아래 영역 삭제 (SK이노베이션, SK온, SK아이이테크놀로지) -->
              <div class="lca-chart">
                <div class="lca-chart__title-wrap">
                  <h4 class="lca-chart__title">2022년 주요 공정</h4>
                </div>
                <div class="lca-chart__area">
                  <Bar :Options="barOptions" />
                  <!-- <img src="@/assets/images/dummy-chart-400x416.png" alt="" /> -->
                </div>
              </div>
              <!--// (D) 주요공정 차트가 없는 OC 아래 영역 삭제 (SK이노베이션, SK온, SK아이이테크놀로지) -->
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="scroll-icon motion-item">SCROLL</div>
  </div>
</template>
