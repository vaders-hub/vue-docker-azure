<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import {
  DxChart,
  DxSeries,
  DxValueAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxLegend,
  DxTooltip,
  DxPoint,
} from 'devextreme-vue/chart'
import DxSelectBox from 'devextreme-vue/select-box'

import type { PropType } from 'vue'
import type { PolygonalLineOptions } from '@/interface/common'

export default defineComponent({
  name: 'PolygonalLine',
  props: {
    Options: {
      type: Object as PropType<PolygonalLineOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxExport,
    DxLegend,
    DxTooltip,
    DxPoint,
  },
  setup(context) {
    const type = ref('majorPrcTrend_data')
    const types = ['line', 'stackedline', 'fullstackedline']

    const customizeTooltip = (text) => {
      const title = text.seriesName
      const body = text.value

      return {
        html: `<div><p>${title}</p><p>${body}</p></div>`,
      }
    }

    return {
      type,
      types,
      customizeTooltip,
    }
  },
})
</script>
<template>
  <div :id="Options.idName">
    <DxChart id="polygonalLine_chart" :data-source="Options.loadedData" palette="Violet">
      <DxCommonSeriesSettings type="line" argument-field="baseDt" />
      <DxSeries
        v-for="data in Options.series"
        :key="data.value"
        :value-field="data.value"
        :name="data.name"
        :color="data.color"
      >
        <DxPoint :symbol="data.point.shape" :color="data.point.color" />
      </DxSeries>
      <DxValueAxis
        :tick-interval="5000"
        name="SKI"
        position="left"
        :visual-range="[15000, 45000]"
      />

      <DxLegend
        vertical-alignment="top"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <DxExport :enabled="false" />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
    </DxChart>
    <div class="options" style="display: none">
      <div class="caption">Options</div>
      <div class="option">
        <span>Series Type</span>
        <DxSelectBox :data-source="types" v-model:value="type" />
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
