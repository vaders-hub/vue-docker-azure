<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import StoryScope12 from '@/components/story/StoryScope_1_2.vue'
import StoryScope3 from '@/components/story/StoryScope_3.vue'
import StoryNetZero from '@/components/story/StoryNetZero.vue'

import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Storyline',
  components: {
    Header,
    Footer,
    StoryScope12,
    StoryScope3,
    StoryNetZero,
  },

  setup(context) {
    const compName = ref('StoryScope12')

    const Tabs = reactive([
      { name: 'Scope 1/2', active: true, value: 'StoryScope12' },
      { name: 'Scope 3', active: false, value: 'StoryScope3' },
      { name: 'Net Zero', active: false, value: 'StoryNetZero' },
    ])
    const onClickTab = (idx) => {
      Icons.forEach((v, i) => {
        v.active = ''
        if (i === 0) {
          v.active = 'is-active'
        }
      })
      Tabs.forEach((v, i) => {
        v.active = false
        if (idx === i) {
          v.active = true
          compName.value = v.value
        }
      })
    }

    const Icons = reactive([
      { name: 'SKI', active: 'is-active', class: 'ski' },
      { name: 'SKE(w/TI)', active: '', class: 'ske' },
      { name: 'SKGC', active: '', class: 'skgc' },
      { name: 'SKO', active: '', class: 'sko' },
      { name: 'SKL', active: '', class: 'skl' },
      { name: 'SKIPC', active: '', class: 'skipc' },
      { name: 'SKIET', active: '', class: 'skiet' },
      { name: 'SKEO', active: '', class: 'skeo' },
    ])

    const onClickIcon = (e, idx) => {
      e.preventDefault()
      Icons.forEach((v, i) => {
        v.active = ''
        if (idx === i) {
          v.active = 'is-active'
        }
      })
    }

    const activeIcon = computed(() => {
      const icon = Icons.filter((v) => v.active === 'is-active')
      return icon
    })

    return { compName, Tabs, onClickTab, Icons, onClickIcon, activeIcon }
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
            <li v-for="(item, index) in Icons" :key="index">
              <a
                :class="`icon-company icon-company--${item.class} ${item.active}`"
                href="#"
                @click="onClickIcon($event, index)"
                ><span>{{ item.name }}</span></a
              >
            </li>
            <!-- (D) 활성화 탭 is-active 클래스 추가 및 div.storyline__chart > h3.hidden의 텍스트를 선택된 탭명으로 변경 -->
          </ul>
        </div>
      </div>
    </div>

    <component :is="compName" keep-alive :current="activeIcon" />
  </section>
  <Footer />
</template>
