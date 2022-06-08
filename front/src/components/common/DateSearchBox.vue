<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import SelectBox from './SelectBox.vue'

export default defineComponent({
  name: 'DateSerachBox',
  components: {
    SelectBox,
  },
  emit: {
    'click-event': JSON,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    // 날짜 세팅
    const setDate = new Date()
    setDate.setMonth(setDate.getMonth() - 1)
    let sch_year = setDate.getFullYear()
    let sch_month = setDate.getMonth() + 1
    let yearOption: any = []
    let monthOption: any = []
    dateSetting()

    function dateSetting() {
      for (let i = sch_year; i > sch_year - 10; i--) {
        let dateOption = { id: i, name: i + '년' }
        yearOption.push(dateOption)
      }
      for (let i = 1; i < 13; i++) {
        let dateOption = { id: i, name: i + '월' }
        monthOption.push(dateOption)
      }
    }

    function yearValChanged(e) {
      sch_year = e
    }

    function monthValChanged(e) {
      sch_month = e
    }

    return {
      SelectBox,
      yearOption,
      monthOption,
      yearValChanged,
      monthValChanged,
      sch_year,
      sch_month,
    }
  },
})
</script>
<template>
  <div class="view-options-wrap">
    <SelectBox
      :selectData="yearOption"
      @selectChanged="yearValChanged"
      :value="sch_year"
      v-model="sch_year"
      value-expr="id"
      display-expr="name"
    />
    <SelectBox
      :selectData="monthOption"
      @selectChanged="monthValChanged"
      :value="sch_month"
      v-model="sch_month"
      value-expr="id"
      display-expr="name"
    />
    <div class="view-options__btn">
      <button class="btn" @click="$emit('click-event', { yyyy: sch_year, mm: sch_month })">
        확인
      </button>
    </div>
  </div>
</template>
