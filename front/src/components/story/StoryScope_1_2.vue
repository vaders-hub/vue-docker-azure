<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'Scope12',
  props: {
    current: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  setup(props) {
    let chartData = reactive(props.current)
    const loadChartData = async () => {
      await console.log('loadChartData', JSON.parse(JSON.stringify(chartData))[0])
    }

    loadChartData()

    watch(
      () => props.current,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          chartData = newVal
          loadChartData()
        }
      },
    )
    return {}
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
                  <img src="@/assets/images/dummy-chart-920x416.png" alt="" />
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
