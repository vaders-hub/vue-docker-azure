<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import DropdownSingle from '@/components/common/DropdownSingle.vue'
import { hander } from '@/lib/index'
import Diagram1 from '@/components/chart/Diagram-1.vue'

export default defineComponent({
  name: 'Assessment',
  components: {
    DropdownSingle,
    Diagram1,
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
        AppElement.classList.add('wrap', 'wrap--assessment')
      }
    })

    onBeforeUnmount(() => {
      if (AppElement) {
        AppElement.classList.remove('wrap', 'wrap--assessment')
      }
    })

    const onClickStep = ({ target }, idx?) => {
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
    const step3ItemsChk = ref('intg')
    const step3ItemsTtl = computed(() => {
      const title = step3ItemsChk.value === 'intg' ? '통합' : '개별'
      return title
    })
    const step3Items = [{ title: 'R&S' }, { title: 'GC' }, { title: 'L' }]
    const step3ItemsSelected = ref([])
    const step3ItemsSelectedTtl = computed(() => {
      const title = step3ItemsChk.value === 'intg' ? step3ItemsSelected.value.join(', ') : ''
      return title
    })

    const step4DropDatas = [
      [
        {
          ID: '1',
          name: 'Stores 1',
        },
        {
          ID: '2',
          name: 'Super Mart of the West 1',
        },
      ],
      [
        {
          ID: '1',
          name: 'Stores 2',
        },
        {
          ID: '2',
          name: 'Super Mart of the West 2',
        },
      ],
      [
        {
          ID: '1',
          name: 'Stores 3',
        },
        {
          ID: '2',
          name: 'Super Mart of the West 3',
        },
      ],
    ]

    let selectedStep4DropDatas: string[] = Array(3).fill('')

    const singleDropChanged = ({ name, text, value }) => {
      const [dataName, idx] = name.split('-')

      selectedStep4DropDatas[idx] = text
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
      step4DropDatas,
      singleDropChanged,
    }
  },
})
</script>

<template>
  <section class="contents">
    <h1 class="hidden">평가</h1>
    <div class="assessment">
      <div class="assessment__data">
        <h2 class="assessment__title">평가 항목을 입력해주세요.</h2>

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
                <div class="option-item" v-for="(item, index) in step4DropDatas" :key="index">
                  <em class="option-item__title"
                    ><span>Step {{ index + 1 }}</span
                    >SKE BM 선택</em
                  >
                  <div class="option-item__data">
                    <DropdownSingle
                      :treeName="`step4DropDatas-${index}`"
                      :treeData="item"
                      @dropChanged="singleDropChanged"
                    />
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
                    <div class="select-wrap">
                      <select>
                        <option>Virgin Naph</option>
                        <option>Renewable (Naph)</option>
                      </select>
                    </div>
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
                    <div class="select-wrap">
                      <select data-options='{"msg": "Conventional Crude"}'>
                        <option>Conventional Crude</option>
                        <option>Renewables (UCO)</option>
                        <option>열분해유</option>
                      </select>
                    </div>
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
                <Diagram1 />
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
                <div class="option-item">
                  <div
                    class="accordion"
                    data-options='{
                    "id": "chk-assessment-step7-1",
                    "openType": "multi"
                  }'
                  >
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item is-checked">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">공정 효율 개선(단기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data">
                            <span class="txt">#1 PX 효율 개선 (MVR 설치)</span>
                          </span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-1-1" />
                              <label for="chk-assessment-step7-1-1-1"
                                >NAC 효율 개선 (Flare Tip)</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-1-2" checked />
                              <label for="chk-assessment-step7-1-1-2"
                                >NEP 효율 개선 (GTG 교체)</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-1-3" />
                              <label for="chk-assessment-step7-1-1-3"
                                >#1 PX 효율 개선 (MVR 설치)</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-1-4" />
                              <label for="chk-assessment-step7-1-1-4"
                                >공정 효율 개선(단기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-1-5" />
                              <label for="chk-assessment-step7-1-1-5"
                                >공정 효율 개선(단기) 선택 항목</label
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item is-checked">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">공정 효율 개선(중기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data">
                            <span class="txt">공정 효율 개선(중기) 선택 항목</span>
                            <span class="add">외 <i>+2</i></span></span
                          >
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-2-1" />
                              <label for="chk-assessment-step7-1-2-1"
                                >공정 효율 개선(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-2-2" checked />
                              <label for="chk-assessment-step7-1-2-2"
                                >공정 효율 개선(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-2-3" checked />
                              <label for="chk-assessment-step7-1-2-3"
                                >공정 효율 개선(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-2-4" checked />
                              <label for="chk-assessment-step7-1-2-4"
                                >공정 효율 개선(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-2-5" />
                              <label for="chk-assessment-step7-1-2-5"
                                >공정 효율 개선(중기) 선택 항목</label
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">공정 효율 개선(장기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-3-1" />
                              <label for="chk-assessment-step7-1-3-1"
                                >공정 효율 개선(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-3-2" />
                              <label for="chk-assessment-step7-1-3-2"
                                >공정 효율 개선(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-3-3" />
                              <label for="chk-assessment-step7-1-3-3"
                                >공정 효율 개선(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-3-4" />
                              <label for="chk-assessment-step7-1-3-4"
                                >공정 효율 개선(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-1-3-5" />
                              <label for="chk-assessment-step7-1-3-5"
                                >공정 효율 개선(장기) 선택 항목</label
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--// 공정 효율 개선 -->

                <!-- 연료전환 -->
                <div class="option-item">
                  <div
                    class="accordion"
                    data-options='{
                    "id": "chk-assessment-step7-2",
                    "openType": "multi"
                  }'
                  >
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">연료전환(단기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-1-1" />
                              <label for="chk-assessment-step7-2-1-1"
                                >연료전환(단기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-1-2" />
                              <label for="chk-assessment-step7-2-1-2"
                                >연료전환(단기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-1-3" />
                              <label for="chk-assessment-step7-2-1-3"
                                >연료전환(단기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-1-4" />
                              <label for="chk-assessment-step7-2-1-4"
                                >연료전환(단기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-1-5" />
                              <label for="chk-assessment-step7-2-1-5"
                                >연료전환(단기) 선택 항목</label
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">연료전환(중기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-2-1" />
                              <label for="chk-assessment-step7-2-2-1"
                                >연료전환(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-2-2" />
                              <label for="chk-assessment-step7-2-2-2"
                                >연료전환(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-2-3" />
                              <label for="chk-assessment-step7-2-2-3"
                                >연료전환(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-2-4" />
                              <label for="chk-assessment-step7-2-2-4"
                                >연료전환(중기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-2-5" />
                              <label for="chk-assessment-step7-2-2-5"
                                >연료전환(중기) 선택 항목</label
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">연료전환(장기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-3-1" />
                              <label for="chk-assessment-step7-2-3-1"
                                >연료전환(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-3-2" />
                              <label for="chk-assessment-step7-2-3-2"
                                >연료전환(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-3-3" />
                              <label for="chk-assessment-step7-2-3-3"
                                >연료전환(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-3-4" />
                              <label for="chk-assessment-step7-2-3-4"
                                >연료전환(장기) 선택 항목</label
                              >
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-2-3-5" />
                              <label for="chk-assessment-step7-2-3-5"
                                >연료전환(장기) 선택 항목</label
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--// 연료전환 -->

                <!-- renewable energy -->
                <div class="option-item option-item--renewable-energy">
                  <div class="option-item__label">
                    <label for="inp-renewable-energy">Renewable Energy</label>
                  </div>
                  <div class="option-item__input">
                    <div class="input">
                      <input type="text" id="inp-renewable-energy" required />
                      <span class="input__unit">%</span>
                    </div>
                  </div>
                </div>
                <!--// renewable energy -->

                <!-- CCUS -->
                <div class="option-item">
                  <div
                    class="accordion"
                    data-options='{
                    "id": "chk-assessment-step7-3",
                    "openType": "multi"
                  }'
                  >
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">CCUS(단기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-1-1" />
                              <label for="chk-assessment-step7-3-1-1">CCUS(단기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-1-2" />
                              <label for="chk-assessment-step7-3-1-2">CCUS(단기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-1-3" />
                              <label for="chk-assessment-step7-3-1-3">CCUS(단기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-1-4" />
                              <label for="chk-assessment-step7-3-1-4">CCUS(단기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-1-5" />
                              <label for="chk-assessment-step7-3-1-5">CCUS(단기) 선택 항목</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">CCUS(중기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-2-1" />
                              <label for="chk-assessment-step7-3-2-1">CCUS(중기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-2-2" />
                              <label for="chk-assessment-step7-3-2-2">CCUS(중기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-2-3" />
                              <label for="chk-assessment-step7-3-2-3">CCUS(중기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-2-4" />
                              <label for="chk-assessment-step7-3-2-4">CCUS(중기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-2-5" />
                              <label for="chk-assessment-step7-3-2-5">CCUS(중기) 선택 항목</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- (dev) 체크된 항목이 있을 경우 is-checked 클래스 추가 -->
                    <div class="accordion-item">
                      <div class="accordion-header">
                        <button type="button" class="accordion-btn" aria-expanded="false">
                          <em class="accordion-btn__title">CCUS(장기)</em>
                          <!-- (dev) 체크된 항목이 있을 경우, 체크된 항목 텍스트 노출(체크된 항목이 없을 경우, 영역을 삭제하거나 빈 값으로 출력)
                            여러개 선택이 된 경우, 첫번째 항목만 텍스트를 노출하고 나머지 선택된 항목의 개수는 아래 마크업 형태로 출력
                            <span>외 <i>+숫자</i></span>
                          -->
                          <span class="accordion-btn__selected-data"></span>
                          <span
                            class="accordion-btn__text"
                            data-text='{"text":"열기|닫기", "show":1}'
                            >열기</span
                          >
                        </button>
                      </div>
                      <div class="accordion-panel" aria-hidden="true">
                        <div class="accordion-cont">
                          <ul class="checkbox-list">
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-3-1" />
                              <label for="chk-assessment-step7-3-3-1">CCUS(장기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-3-2" />
                              <label for="chk-assessment-step7-3-3-2">CCUS(장기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-3-3" />
                              <label for="chk-assessment-step7-3-3-3">CCUS(장기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-3-4" />
                              <label for="chk-assessment-step7-3-3-4">CCUS(장기) 선택 항목</label>
                            </li>
                            <li>
                              <input type="checkbox" id="chk-assessment-step7-3-3-5" />
                              <label for="chk-assessment-step7-3-3-5">CCUS(장기) 선택 항목</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--// CCUS -->
              </div>
            </div>
          </div>
          <!--// step 7 저감 Option -->
        </div>
      </div>
      <div class="assessment__result">
        <h2 class="assessment__title">평가 결과를 확인하세요.</h2>
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
              <span class="result-info__title-unit">(단위: 만원)</span>
            </h3>
            <div class="result-info__table">
              <table>
                <caption>
                  Total Emission
                </caption>
                <thead>
                  <tr>
                    <th scope="col" colspan="2">구분</th>
                    <th scope="col">
                      감축 Option 적용 전
                      <span>(Baseline 대비)</span>
                    </th>
                    <th scope="col">감축 Option 적용 후</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" colspan="2">누적 절대 배출량</th>
                    <td><em>(-999.99)</em><span>999,999,999</span></td>
                    <td><em>(-999.99)</em><span>945,999,999</span></td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="2">Scope 1&amp;2,3</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="2">Scope 3</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2">Olefin</th>
                    <th scope="row">Ethylene</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Propylene</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2">Aromatics</th>
                    <th scope="row">B/T/X</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">PX</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2">Polymer</th>
                    <th scope="row">PE</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">PP</th>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
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
  width: 670px;
  height: 500px;
  padding: 0;
  overflow: hidden;
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
}
</style>
