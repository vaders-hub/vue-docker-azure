<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxValueAxis,
  DxTitle,
  DxLegend,
  DxExport,
  DxTooltip,
} from 'devextreme-vue/chart'

import type { PropType } from 'vue'
import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'StackedBar',
  props: {
    Options: {
      type: Object as PropType<LineOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxValueAxis,
    DxTitle,
    DxLegend,
    DxExport,
    DxTooltip,
  },
  setup(context) {
    const maleAgeData = [
      {
        state: 'Germany',
        young: 5.3,
        middle: 26,
        older: 8,
      },
      {
        state: 'Japan',
        young: 6.45,
        middle: 30.5,
        older: 11.22,
      },
      {
        state: 'Russia',
        young: 12.56,
        middle: 45.5,
        older: 6.5,
      },
      {
        state: 'USA',
        young: 32,
        middle: 87,
        older: 15,
      },
    ]
    const getMaleAgeData = computed(() => {
      return maleAgeData
    })

    return {
      getMaleAgeData,
    }
  },
})
</script>
<template>
  <div id="spider-demo">
    <DxChart id="chart" :data-source="getMaleAgeData" title="Male Age Structure">
      <DxCommonSeriesSettings argument-field="state" type="stackedbar" />
      <DxValueAxis position="right">
        <DxTitle text="millions" />
      </DxValueAxis>
      <DxSeries value-field="young" name="0-14" />
      <DxSeries value-field="middle" name="15-64" />
      <DxSeries value-field="older" name="65 and older" />
      <DxLegend
        vertical-alignment="bottom"
        horizontal-alignment="center"
        item-text-position="top"
      />
      <DxExport :enabled="true" />
      <DxTooltip :enabled="true" location="edge" />
    </DxChart>
  </div>
</template>
<style lang="scss"></style>
