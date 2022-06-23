<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  reactive,
  ref,
  inject,
  toRaw,
} from 'vue'
import { useAssessmentStore } from '@/store/assessment/index'
import SelectBox from '@/components/common/SelectBox.vue'
import DropdownMultiple from '@/components/common/DropdownMultiple.vue'
import { hander } from '@/lib/index'
import Diagram from '@/components/chart/Diagram.vue'
import tempTreeData from '@/store/assessment/tree'

export default defineComponent({
  name: 'Assessment',
  components: {
    SelectBox,
    DropdownMultiple,
    Diagram,
  },
  setup(context) {
    let AppElement
    let StepElements
    let StepsLen

    onMounted(() => {
      AppElement = document.querySelector('#app')
      StepElements = document.querySelectorAll('.assessment-step')
      StepsLen = StepElements.length

      hander.contentReady()

      if (AppElement) {
        AppElement.classList.add('wrap--assessment')
      }

      document.querySelector('.header__util')?.classList.remove('is-active')
    })

    onBeforeUnmount(() => {
      if (AppElement) {
        AppElement.classList.remove('wrap--assessment')
      }
    })

    const stepValidator = () => {
      // if (!step1ItemsSelected.value) return false
      // if (!step2ItemsSelected.value) return false
      // if (!step3ItemsTtl.value) return false
      // if (step3ItemsChk.value === 'intg' && step3ItemsSelected.value.length === 0) return false
      return true
    }

    const onClickStep = async ({ target }, idx?) => {
      const r = stepValidator()

      if (idx > 2 && !r) {
        alert('Step 1, 2, 3 항목을 선택해주세요')
        return false
      }
      for (let i = 0; i < StepsLen; i++) {
        StepElements[i].classList.remove('is-expand')
      }

      StepElements[idx].classList.add('is-expand')
    }

    const step1Items = [
      {
        title: 'Baseline',
        label: 'Baseline',
      },
      {
        title: '현재',
        label: '현재',
      },
      {
        title: '단기',
        label: '2025',
      },
      {
        title: '중기',
        label: '2030',
      },
      {
        title: '장기',
        label: '2040',
      },
      {
        title: '장기',
        label: '2050',
      },
    ]
    const step1ItemsSelected = ref('')
    const step2Items = [
      { title: 'SK에너지' },
      { title: 'SK지오센트릭' },
      { title: 'SK루브리컨즈' },
      { title: 'SK인천석유화학' },
    ]
    const step2ItemsSelected = ref('')
    const step3ItemsChk = ref('')
    const step3ItemsTtl = computed(() => {
      const title =
        step3ItemsChk.value === 'intg' ? '통합' : step3ItemsChk.value !== '' ? '개별' : ''
      return title
    })
    const step3Items = [{ title: 'R&S' }, { title: 'GC' }, { title: 'L' }]
    const step3ItemsSelected = ref([])
    const step3ItemsSelectedTtl = computed(() => {
      const title = step3ItemsChk.value === 'intg' ? step3ItemsSelected.value.join(', ') : ''
      return title
    })

    const step4tempData = [
      'HD Video Player',
      'SuperHD Video Player',
      'SuperPlasma 50',
      'SuperLED 50',
      'SuperLED 42',
      'SuperLCD 55',
      'SuperLCD 42',
      'SuperPlasma 65',
      'SuperLCD 70',
      'Projector Plus',
      'Projector PlusHT',
      'ExcelRemote IR',
      'ExcelRemote BT',
      'ExcelRemote IP',
    ]

    let selectedStep4DropDatas: string[] = Array(3).fill('')

    const multiDropChanged = (e) => {
      // console.log('multiDropChanged', e)
    }

    const selectChanged = (e) => {
      // console.log('selectChanged', e)
    }

    const api = inject('api', (opt) => ({}), false)
    const loginInfo = reactive({ id: '', pw: '' })
    const apiTest = async () => {
      try {
        const user = await api({ methods: 'get', url: '/api/member', params: loginInfo })
      } catch (e) {
        console.warn(e)
      }
    }

    const dummyCssTest = ref([
      {
        id: '1',
        name: 'a',
        class: 'hideme',
        sub: [
          { id: '1#1', name: 'b' },
          { id: '1#2', name: 'c' },
        ],
      },
      {
        id: '2',
        name: 'd',
        class: 'hideme',
        sub: [
          { id: '2#1', name: 'e' },
          { id: '2#2', name: 'f' },
          { id: '2#3', name: 'g' },
        ],
      },
    ])

    const dummyCssTestToggle = (idx) => {
      const tobe = dummyCssTest.value.map((v) =>
        v.id === idx
          ? {
              ...v,
              class: v.class === 'hideme' ? '' : 'hideme',
            }
          : v,
      )

      dummyCssTest.value = tobe
    }

    return {
      onClickStep,
      step1Items,
      step1ItemsSelected,
      step2Items,
      step2ItemsSelected,
      step3ItemsChk,
      step3ItemsTtl,
      step3Items,
      step3ItemsSelected,
      step3ItemsSelectedTtl,
      step4tempData,
      tempTreeData,
      selectChanged,
      multiDropChanged,
      apiTest,
      dummyCssTest,
      dummyCssTestToggle,
    }
  },
})
</script>

<template>
  <section class="contents">
    <h1 class="hidden">평가</h1>
    <div class="assessment">
      <div class="assessment__data">
        <h2 class="assessment__title">
          평가 항목을 입력해주세요. <button @click="apiTest">apiTest</button>
        </h2>

        <div class="assessment-step-wrap">
          <!-- step 1 시점 -->
          <div id="step1" class="assessment-step is-expand">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 0)">
                <strong>Step 1</strong>
                <em>평가 시점 연도를 선택하세요.</em>
              </h3>
              <!-- (dev) 버튼 클릭 시 div.assessment-step에 is-expand 클래스 추가 -->
              <button class="assessment-step__selected-data">
                <em>시점</em>
                <!-- (dev) 선택된 데이터 출력 영역 default는 빈 값, 다중 값 표현시 구분자는 / 사용 -->
                <span>Baseline</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <ul class="option-list option-list--timing">
                <template v-for="(item, index) in step1Items" :key="index">
                  <li class="option-item" v-if="index < 4">
                    <em class="option-item__title">{{ item.title }}</em>
                    <div class="option-item__data">
                      <div class="check-radio">
                        <input
                          type="radio"
                          :id="`rd-assessment-step1-${index + 1}`"
                          name="rd-assessment-step1"
                          :value="item.label"
                          v-model="step1ItemsSelected"
                        />
                        <label :for="`rd-assessment-step1-${index + 1}`">{{ item.label }}</label>
                      </div>
                    </div>
                  </li>
                  <li class="option-item" v-if="index > 4">
                    <em class="option-item__title">{{ item.title }}</em>
                    <div class="option-item__data">
                      <div class="check-radio">
                        <input
                          type="radio"
                          id="rd-assessment-step1-5"
                          name="rd-assessment-step1"
                          value="2040"
                          v-model="step1ItemsSelected"
                        />
                        <label for="rd-assessment-step1-5">2040</label>
                      </div>
                      <div class="check-radio">
                        <input
                          type="radio"
                          id="rd-assessment-step1-6"
                          name="rd-assessment-step1"
                          value="2050"
                          v-model="step1ItemsSelected"
                        />
                        <label for="rd-assessment-step1-6">2050</label>
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!--// step 1 시점 -->
          <!-- step 2 사업회사 -->
          <div id="step2" class="assessment-step">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 1)">
                <strong>Step 2</strong>
                <em>사업회사를 선택하세요.</em>
              </h3>
              <!-- (dev) 버튼 클릭 시 div.assessment-step에 is-expand 클래스 추가 -->
              <button class="assessment-step__selected-data">
                <em>사업회사</em>
                <!-- (dev) 선택된 데이터 출력 영역 default는 빈 값, 다중 값 표현시 구분자는 / 사용 -->
                <span>SK에너지</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <div class="option-list option-list--oc">
                <div class="option-item">
                  <div class="check-radio" v-for="(item, index) in step2Items" :key="index">
                    <input
                      type="radio"
                      :id="`rd-assessment-step2-${index + 1}`"
                      name="rd-assessment-step2"
                      :value="item.title"
                      v-model="step2ItemsSelected"
                    />
                    <label :for="`rd-assessment-step2-${index + 1}`">
                      <span class="icon-oc icon-oc--ske"></span>
                      {{ item.title }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--// step 2 사업회사 -->
          <!-- step 3 평가 방법 -->
          <div id="step3" class="assessment-step">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 2)">
                <strong>Step 3</strong>
                <em>평가 방법을 선택하세요.</em>
              </h3>
              <button class="assessment-step__selected-data">
                <em>평가 방법</em>
                <span>통합 평가: CLX 연계 / R&amp;S</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <div class="option-list option-list--method">
                <!-- (dev) 통합 평가 선택 시, 개별 평가 input disabled 속성 추가 -->
                <div class="option-item">
                  <div class="checkbox">
                    <input
                      type="radio"
                      id="rd-assessment-step3-1"
                      value="intg"
                      v-model="step3ItemsChk"
                    />
                    <label for="rd-assessment-step3-1">통합 평가: CLX 연계</label>
                  </div>
                  <!-- (dev) 통합 평가 선택 시, 아래 input disabled 속성 삭제 -->
                  <!-- (dev) 개별 평가 선택 시, 아래 input disabled 속성 추가 -->
                  <div class="check-radio-wrap">
                    <div v-for="(item, index) in step3Items" :key="index" class="check-radio">
                      <input
                        type="checkbox"
                        :id="`rd-assessment-step3-1-${index + 1}`"
                        name="rd-assessment-step3-1"
                        :value="item.title"
                        v-model="step3ItemsSelected"
                        :disabled="step3ItemsChk === 'intg' ? false : true"
                      />
                      <label :for="`rd-assessment-step3-1-${index + 1}`">{{ item.title }}</label>
                    </div>
                  </div>
                </div>
                <!-- (dev) 개별 평가 선택 시, 통합 평가 input disabled 속성 추가 -->
                <div class="option-item">
                  <div class="checkbox">
                    <input
                      type="radio"
                      id="rd-assessment-step3-2"
                      value="indiv"
                      v-model="step3ItemsChk"
                    />
                    <label for="rd-assessment-step3-2">개별 평가: 사업장 단독</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--// step 3 평가 방법 -->
          <!-- step 4 Business Model -->
          <div id="step4" class="assessment-step">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 3)">
                <strong>Step 4</strong>
                <em>Business Model을 선택하세요.</em>
              </h3>
              <!-- (dev) 버튼 클릭 시 div.assessment-step에 is-expand 클래스 추가 -->
              <button class="assessment-step__selected-data">
                <em>Business Model</em>
                <!-- (dev) 선택된 데이터 출력 영역 default는 빈 값, 다중 값 표현시 구분자는 / 사용 -->
                <span>Petchem III (Crude + Bio)</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <div class="option-list option-list--bm">
                <div class="option-item">
                  <em class="option-item__title"><span>Step </span>SKE BM 선택</em>
                  <div class="option-item__data">
                    <SelectBox :selectData="step4tempData" @selectChanged="selectChanged" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--// step 4 Business Model -->
          <!-- step 5 원료 -->
          <div id="step5" class="assessment-step">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 4)">
                <strong>Step 5</strong>
                <em>GC FRN 투입 비율을 입력하세요.</em>
              </h3>
              <!-- (dev) 버튼 클릭 시 div.assessment-step에 is-expand 클래스 추가 -->
              <button class="assessment-step__selected-data">
                <em>원료</em>
                <!-- (dev) 선택된 데이터 출력 영역 default는 빈 값, 다중 값 표현시 구분자는 / 사용 -->
                <span>Virgin Naph / 50%</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <div class="option-list option-list--gc-frn">
                <!-- 사업회사: SK에너지 / 평가 방법: 통합 평가 -->
                <div class="option-item">
                  <div class="option-item__select">
                    <SelectBox :selectData="step4tempData" @selectChanged="selectChanged" />
                  </div>
                  <div class="option-item__input">
                    <div class="input">
                      <input type="text" required />
                      <span class="input__unit">%</span>
                    </div>
                  </div>
                </div>
                <!--// 사업회사: SK에너지 / 평가 방법: 통합 평가 -->
                <!-- 사업회사: SK에너지 / 평가 방법: 개별 평가 -->
                <div class="option-item">
                  <div class="option-item__select">
                    <SelectBox :selectData="step4tempData" @selectChanged="selectChanged" />
                  </div>
                  <div class="option-item__input">
                    <div class="input">
                      <input type="text" required />
                      <span class="input__unit">%</span>
                    </div>
                  </div>
                </div>
                <!--// 사업회사: SK에너지 / 평가 방법: 개별 평가 -->
              </div>
            </div>
          </div>
          <!--// step 5 원료 -->
          <!-- step 6 공정 On / Off -->
          <div id="step6" class="assessment-step">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 5)">
                <strong>Step 6</strong>
                <em>공정 On / Off를 선택하세요.</em>
              </h3>
              <!-- (dev) 버튼 클릭 시 div.assessment-step에 is-expand 클래스 추가 -->
              <button class="assessment-step__selected-data">
                <em>공정 On / Off</em>
                <!-- (dev) 선택된 데이터 출력 영역 default는 빈 값, 다중 값 표현시 구분자는 / 사용 -->
                <span>선택된 데이터</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <div class="diagram-wrap">
                <Diagram />
              </div>
            </div>
          </div>
          <!--// step 6 공정 On / Off -->
          <!-- step 7 저감 Option -->
          <div id="step7" class="assessment-step">
            <div class="assessment-step__header">
              <h3 class="assessment-step__title" @click="onClickStep($event, 6)">
                <strong>Step 7</strong>
                <em>저감 Option을 선택하세요.<span>(다중 선택 가능)</span> </em>
              </h3>
              <!-- (dev) 버튼 클릭 시 div.assessment-step에 is-expand 클래스 추가 -->
              <button class="assessment-step__selected-data">
                <em>저감 Option</em>
                <!-- (dev) 선택된 데이터 출력 영역 default는 빈 값, 다중 값 표현시 구분자는 / 사용 -->
                <span>공정 효율 개선(단기) / 공정 효율 개선(중기)</span>
              </button>
            </div>
            <div class="assessment-step__contents">
              <div class="option-list option-list--reduction">
                <!-- 공정 효율 개선 -->
                <DropdownMultiple
                  :treeName="`step7DropDatas-0`"
                  :treeData="tempTreeData"
                  @dropChanged="multiDropChanged"
                />
                <!--// 공정 효율 개선 -->

                <!-- 연료전환 -->
                <DropdownMultiple
                  :treeName="`step7DropDatas-1`"
                  :treeData="tempTreeData"
                  @dropChanged="multiDropChanged"
                />
                <!--// 연료전환 -->

                <!-- renewable energy -->
                <DropdownMultiple
                  :treeName="`step7DropDatas-2`"
                  :treeData="tempTreeData"
                  @dropChanged="multiDropChanged"
                />
                <!--// renewable energy -->

                <!-- CCUS -->
                <DropdownMultiple
                  :treeName="`step7DropDatas-3`"
                  :treeData="tempTreeData"
                  @dropChanged="multiDropChanged"
                />
                <!--// CCUS -->
              </div>
            </div>
          </div>
          <!--// step 7 저감 Option -->
        </div>
      </div>
      <div class="assessment__result">
        <h2 class="assessment__title">
          평가 결과를 확인하세요.
          <em>*평가 결과는 내부 참고용으로만 활용해 주시기 바랍니다.</em>
        </h2>
        <div class="result-info">
          <ul class="result-info__list">
            <li class="result-info__item">
              <em>평가 시점</em>
              <strong>{{ step1ItemsSelected }}</strong>
            </li>
            <li class="result-info__item">
              <em>사업 회사</em>
              <strong>{{ step2ItemsSelected }}</strong>
            </li>
            <li class="result-info__item">
              <em>평가 방법</em>
              <strong>{{ step3ItemsTtl }} {{ step3ItemsSelectedTtl }}</strong>
            </li>
          </ul>

          <div class="result-info__data">
            <h3 class="result-info__title">
              <strong>Total Emission</strong>
              <span class="result-info__title-unit">(단위: 만원) </span>
            </h3>
            <div class="result-info__table">
              <table>
                <template v-for="item in dummyCssTest" :key="item.id">
                  <tr>
                    {{
                      item.name
                    }}
                    <button @click="dummyCssTestToggle(item.id)">toggle</button>
                  </tr>
                  <tr :class="item.class" v-for="(subitem, iSub) in item.sub" :key="subitem.id">
                    <td v-if="iSub === 0" :rowspan="item.sub.length">{{ item.name }}</td>
                    <td>{{ subitem.name }}</td>
                  </tr>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.diagram-wrap {
  width: 740px;
  height: 590px;
  padding: 0;
  overflow: hidden;
  .dxdi-canvas.dxdi-touch-action {
    width: 740px !important;
    height: 600px !important;
  }
  .dx-diagram {
    border: none;
    .dxdi-canvas {
      background-color: #fff !important;
      .dxdi-page-shadow {
        display: none;
      }

      .dxdi-main {
        transform: translate(0px, 0px);
      }
    }
  }

  .item-selection-rect {
    display: none;
  }
}

.hideme {
  display: none;
}
tr {
  display: table-row;
}
</style>
