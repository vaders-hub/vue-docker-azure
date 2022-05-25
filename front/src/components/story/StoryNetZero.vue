<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'

export default defineComponent({
  name: 'NetZero',
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
  <div class="storyline__chart storyline__chart--net-zero">
    <h3 class="hidden">SKI</h3>
    <div class="contents">
      <!-- div.swiper-slide 개수가 2개 이상일 경우 .swiper 클래스 추가 -->
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
                  <h4 class="lca-chart__title">Scope 1/2 감축 현황</h4>
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-660x440-l.png" alt="" />
                </div>
              </div>
              <div class="lca-chart">
                <div class="lca-chart__title-wrap">
                  <h4 class="lca-chart__title">Scope 1/2 Roadmap</h4>
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-660x440-r.png" alt="" />
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="lca-chart">
                <div class="lca-chart__title-wrap">
                  <h4 class="lca-chart__title">Scope 3 감축 현황</h4>
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-660x440-l.png" alt="" />
                </div>
              </div>
              <div class="lca-chart">
                <div class="lca-chart__title-wrap">
                  <h4 class="lca-chart__title">Scope 3 Roadmap</h4>
                </div>
                <div class="lca-chart__area">
                  <img src="@/assets/images/dummy-chart-660x440-r.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="scroll-icon motion-item">SCROLL</div>
  </div>
</template>
