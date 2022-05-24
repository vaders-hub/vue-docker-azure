<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'

import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Storyline',
  components: {
    Header,
    Footer,
  },
  setup(context) {
    const Tabs = reactive([
      { name: 'Scope 1/2', active: true },
      { name: 'Scope 3', active: false },
      { name: 'Net Zero', active: false },
    ])
    const onClickTab = (idx) => {
      Tabs.forEach((v, i) => {
        v.active = false
        if (idx === i) Tabs[idx].active = true
      })
    }
    return { Tabs, onClickTab }
  },
})
</script>

<template>
  <Header />
  <section class="storyline">
    <h1 class="hidden">Dashboard 스토리 라인</h1>
    <div class="contents">
      <div class="lca-tab">
        <ul>
          <li
            v-for="(item, index) in Tabs"
            :key="index"
            :class="`${item.active === true ? 'is-active' : ''}`"
          >
            <a href="#" @click="onClickTab(index)"
              ><span>{{ item.name }}</span></a
            >
          </li>
        </ul>
      </div>

      <h2 class="hidden">Net Zero</h2>
      <div class="storyline__message">
        <strong>2022년 3월,</strong>
        <p>
          전월 대비 탄소배출량 21톤 증가하였으며 4월에 63톤 감소할 것으로 추정 <br /><em
            >{} 이행 결과 Net Zero Target 달성할 것으로 예상</em
          >
        </p>
      </div>

      <div class="icon-tab">
        <div class="icon-tab__inner">
          <ul>
            <li>
              <!-- (D) 활성화 탭 is-active 클래스 추가 및 div.storyline__chart > h3.hidden의 텍스트를 선택된 탭명으로 변경 -->
              <a class="icon-company icon-company--ski is-active" href="#"><span>SKI</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--ske" href="#"><span>SKE(w/TI)</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--skgc" href="#"><span>SKGC</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--sko" href="#"><span>SKO</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--skl" href="#"><span>SKL</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--skipc" href="#"><span>SKIPC</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--skiet" href="#"><span>SKIET</span></a>
            </li>
            <li>
              <a class="icon-company icon-company--skeo" href="#"><span>SKEO</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- scope 1-2 -->
    <div class="storyline__chart" v-if="Tabs && Tabs[0].active">
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
    <!-- scope 1-2 -->
    <!-- scope 3 -->
    <div class="storyline__chart storyline__chart--scope3" v-if="Tabs && Tabs[1].active">
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
                    <h4 class="lca-chart__title">Scope 3 계획 vs 배출량</h4>
                  </div>
                  <div class="lca-chart__area">
                    <img src="@/assets/images/dummy-chart-920x416.png" alt="" />
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
    <!-- scope 3 -->
    <!-- net-zero -->
    <div class="storyline__chart storyline__chart--net-zero" v-if="Tabs && Tabs[2].active">
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
    <!-- net-zero -->
  </section>
  <Footer />
</template>
