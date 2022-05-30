<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useMainStore } from '@/store/index'

export default defineComponent({
  name: 'Scope 1/2',
  components: {},
  setup(context) {
    const mainStore = useMainStore()

    return {
      mainStore,
    }
  },
})
</script>

<template>
  <section class="contents">
    <div class="page-top">
      <div class="page-top__header">
        <h1 class="page-top__title">Scope 1/2</h1>
        <h2 class="page-top__sub-title"><strong>SK 에너지</strong><span>2022.04</span></h2>
      </div>
      <div class="view-options">
        <div class="view-options-wrap">
          <div class="view-options__year select-wrap">
            <select
              data-options='{
              "maxHeight": "226",
              "msg": "년도"
              }'
            >
              <option>2011년</option>
              <option>2012년</option>
              <option>2013년</option>
              <option>2014년</option>
              <option>2015년</option>
              <option>2016년</option>
              <option>2017년</option>
              <option>2018년</option>
              <option>2019년</option>
              <option>2020년</option>
              <option>2021년</option>
              <option>2022년</option>
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
