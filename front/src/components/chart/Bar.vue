<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import {
  DxChart,
  DxSeries,
  DxValueAxis,
  DxVisualRange,
  DxLabel,
  DxFont,
  DxConstantLine,
  DxLegend,
  // DxExport,
  DxTooltip,
  DxCommonSeriesSettings,
} from 'devextreme-vue/chart'

import type { PropType } from 'vue'
import type { BarOptions } from '@/interface/common'

export default defineComponent({
  name: 'Scope_1_2',
  props: {
    Options: {
      type: Object as PropType<BarOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxSeries,
    DxChart,
    DxValueAxis,
    DxVisualRange,
    DxLabel,
    DxConstantLine,
    DxLegend,
    DxFont,
    // DxExport,
    DxTooltip,
    DxCommonSeriesSettings,
  },

  setup(context) {
    const type = ref('bar')
    const TrendLine = 130

    const customizePoint = (data) => {
      /* if (data.value > TrendLine) {
        return { color: '#ff7c7c', hoverStyle: { color: 'grey' } };
      } */
      return { hoverStyle: { color: 'grey' } }
    }

    const customizeLabel = (data) => {
      /*  Bar 라벨
        if (data.value > TrendLine) {
        return {
          visible: true,
          backgroundColor: '#ff7c7c',
          customizeText({ valueText }) {
            return `${valueText}&#176F`;
          }
        }
      } */
      return null
    }

    const customizeText = (valueText) => {
      return `${valueText.value}` //&#176F;`
    }

    const customizeTooltip = (data) => {
      const date = data.argument
      const name = data.seriesName
      const value = data.value

      return {
        html: `<div>
                <div class='tooltip-header'>기준월: ${date}</div>
                <div class='tooltip-body'>
                  <div class='tooltip-name'>구분: ${name}</div>
                  <div class='tooltip-value'>배출량: ${value}</div>
                </div>
              </div>`,
      }
    }

    return {
      customizePoint,
      customizeText,
      customizeLabel,
      TrendLine,
      customizeTooltip,
      type,
    }
  },
})
</script>
<template>
  <div :id="Options.idName">
    <DxChart
      id="bar_chart"
      :customize-point="customizePoint"
      :customize-label="customizeLabel"
      :data-source="Options.loadedData"
      title=""
    >
      <DxCommonSeriesSettings :type="type" argument-field="baseDt" />
      <DxSeries
        v-for="series in Options.series.filter((v, i) => v.value.substring(0, 5) === 'scope')"
        :key="series.value"
        :value-field="series.value"
        :name="series.name"
        :color="series.color"
      />
      <DxValueAxis :max-value-margin="0.01">
        <DxVisualRange :start-value="0" />
        <DxLabel :customize-text="customizeText" />
        <DxConstantLine :width="2" :value="TrendLine" color="#FF7A00" dash-style="dash">
          <DxLabel text="Trend" horizontal-alignment="right">
            <DxFont :size="14" color="#FF7A00" family="suit" />
          </DxLabel>
        </DxConstantLine>
      </DxValueAxis>
      <DxLegend
        vertical-alignment="top"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <DxTooltip :enabled="true" :shared="true" :customize-tooltip="customizeTooltip" />
    </DxChart>
  </div>
</template>
<style lang="scss"></style>
