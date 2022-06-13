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
import type { StackedBarOptions } from '@/interface/common'

export default defineComponent({
  name: 'StackedBar',
  props: {
    Options: {
      type: Object as PropType<StackedBarOptions>,
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
    DxTooltip,
  },
  setup(context) {
    // write
    const customizeTooltip = (data) => {
      const title = data.seriesName
      const value = data.value

      return {
        html: `<div>
                <div class='tooltip-header'>Title: ${title}</div>
                <div class='tooltip-body'>
                  <div class='tooltip-value'>배출량: ${value}</div>
                </div>
              </div>`,
      }
    }

    return {
      customizeTooltip,
    }
  },
})
</script>
<template>
  <div :id="Options.idName">
    <DxChart id="stackedBar_chart" :data-source="Options.loadedData" title="">
      <DxCommonSeriesSettings argument-field="item" type="stackedbar" />
      <DxValueAxis position="left">
        <DxTitle text="" />
      </DxValueAxis>
      <DxSeries
        v-for="series in Options.series"
        :key="series.value"
        :value-field="series.value"
        :name="series.name"
        :color="series.color"
      />
      <DxLegend vertical-alignment="top" horizontal-alignment="center" item-text-position="left" />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
    </DxChart>
  </div>
</template>
<style lang="scss"></style>
