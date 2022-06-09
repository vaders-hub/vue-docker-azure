<script lang="ts">
import { computed, defineComponent, onMounted, ref, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'
import { hander } from '@/lib/index'
import LayoutController from '@/components/common/LayoutController.vue'
import DateSearchBox from '@/components/common/DateSearchBox.vue'

export default defineComponent({
  name: 'Scope 1/2',
  components: { LayoutController, DateSearchBox },
  setup(props) {
    const mainStore = useMainStore()
    const current = mainStore.current
    const currentCompany = mainStore.company

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

    function searchData(data) {
      console.log(data.yyyy + '년 ' + data.mm + '월')
    }

    onMounted(() => {
      hander.contentReady()

      onChangeMenu()
    })

    // 회사 변경 감지
    watch(
      () => mainStore.company,
      (newVal, oldVal) => {
        onChangeMenu(newVal)
      },
    )

    return {
      getStoreVisibility,
      controllerFlag,
      toggleController,
      onCloseController,
      searchData,
      currentCompany,
    }
  },
})
</script>

<template>
  <section class="contents">
    <div class="page-top">
      <div class="page-top__header">
        <h1 class="page-top__title">Scope 1/2 <button @click="toggleController">toggle</button></h1>
        <h2 class="page-top__sub-title"><strong>SK 에너지</strong><span>2022.04</span></h2>
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
      "autoplay": "0",
      "pagination": "bullet"
    }'
    >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">
            <div class="lca-chart" v-if="getStoreVisibility.a">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 1/2 배출량</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart" v-if="getStoreVisibility.b">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장별 배출 현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 1/2 배출량</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장별 배출 현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">Scope 1/2 배출량</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장별 배출 현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
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
                <h3 class="lca-chart__title">배출활동별 배출 현황</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장별 배출활동별 배출 현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출 현황</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">사업장별 배출활동별 배출 현황</h3>
                <span class="lca-chart__unit">(단위 : MWh)</span>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-2.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">배출활동별 배출 현황</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
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
                <h3 class="lca-chart__title">공정별 배출량</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 배출 계수</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-3.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">공정별 배출량</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 배출 계수</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-3.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">공정별 배출량</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-1.gif" alt="" />
              </div>
            </div>
            <div class="lca-chart">
              <div class="lca-chart__title-wrap">
                <h3 class="lca-chart__title">주요 배출 계수</h3>
              </div>
              <div class="lca-chart__area">
                <img src="@/assets/images/dummy-chart-660x390-3.gif" alt="" />
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
