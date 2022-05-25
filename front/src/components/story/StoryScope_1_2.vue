<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import Line from '@/components/chart/Line.vue'

import type { LineOptions } from '@/interface/common'

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
  },
  setup(props) {
    let chartData = reactive(props.current)
    const loadChartData = async () => {
      await console.log('loadChartData', JSON.parse(JSON.stringify(chartData))[0])

      await dashboardStore.loadData('line')
      lineOptions.loadedData = dashboardStore.dataSet.line
    }
    const dashboardStore = useDashboardStore()
    const lineOptions = reactive<LineOptions>({
      idName: 'chart-demo',
      series: [
        { value: 'hydro', name: 'Hydro-electric' },
        { value: 'oil', name: 'Oil' },
        { value: 'gas', name: 'Natural gas' },
        { value: 'coal', name: 'Coal' },
      ],
      loadedData: [],
      style: {
        width: '920px',
        height: '416px',
      },
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

    return { lineOptions }
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
                  <img src="@/assets/images/dummy-chart-400x416.png" alt="" />
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
