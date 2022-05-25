<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxValueAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxLabel,
  DxTitle,
  DxSubtitle,
  DxTooltip,
  DxConstantLine,
} from 'devextreme-vue/chart'
import DxSelectBox from 'devextreme-vue/select-box'

import type { PropType } from 'vue'
import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Line',
  props: {
    Options: {
      type: Object as PropType<LineOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    // DxArgumentAxis,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxExport,
    // DxGrid,
    DxMargin,
    DxLegend,
    DxLabel,
    DxTooltip,
    // DxValueAxis,
    // DxConstantLine,
  },
  setup(context) {
    const type = ref('line')
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
    <DxChart
      id="line_chart"
      :data-source="Options.loadedData"
      palette="Violet"
      :style="Options.style"
    >
      <DxCommonSeriesSettings :type="type" argument-field="energyDate" />
      <DxSeries name="oil" value-field="oil" type="bar" color="#fac29a" />
      <DxSeries
        v-for="energy in Options.series.filter((v, i) => v.value !== 'oil')"
        :key="energy.value"
        :value-field="energy.value"
        :name="energy.name"
        :color="energy.color"
        :axis="energy.value === 'hydro' ? 'hydro' : ''"
      />
      <DxMargin :bottom="20" />
      <DxValueAxis :tick-interval="300" name="oil" position="left" />

      <DxValueAxis
        :tick-interval="20"
        :show-zero="true"
        :value-margins-enabled="false"
        name="hydro"
        position="right"
      >
        <DxLabel />
        <!-- red dashed line -->
        <!-- <DxConstantLine :value="80" :width="2" color="#fc3535" dash-style="dash">
          <DxLabel :visible="false" />
        </DxConstantLine> -->
      </DxValueAxis>

      <!-- gap controll -->
      <!-- <DxArgumentAxis :value-margins-enabled="false" discrete-axis-division-mode="crossLabels">
        <DxGrid :visible="true" />
      </DxArgumentAxis> -->
      <DxLegend
        vertical-alignment="top"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <DxExport :enabled="false" />
      <!-- <DxTitle text="Energy Consumption in 2004">
        <DxSubtitle text="(Millions of Tons, Oil Equivalent)" />
      </DxTitle> -->
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
<style lang="scss">
#line_chart {
  height: 450px;
  width: 659px;

  .dxc-legend {
    .dxc-item {
      rect {
        rx: 12;
      }
    }
  }
}
</style>
