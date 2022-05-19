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
} from 'devextreme-vue/chart';

import type { PropType } from 'vue'
import type { BarOptions } from '@/interface/common'

export default defineComponent({
  name: 'Scope_3',
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
  },

  setup(context) {
    const TrendLine = 130

    const customizePoint = (data) => {
      /* if (data.value > TrendLine) {
        return { color: '#ff7c7c', hoverStyle: { color: 'grey' } };
      } */
      return { hoverStyle: { color: 'grey' } };
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
      return null; 
    }

    const customizeText = (valueText) => {
      return `${valueText.value}`; //&#176F;`
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
    }
  },
})
</script>
<template>
  <div :id="Options.idName">
    <DxChart id="Scope_3" :customize-point="customizePoint" :customize-label="customizeLabel" :data-source="Options.loadedData" title="">
      <DxSeries argument-field="baseDt" value-field=value name="Scope3" type="bar" color="#E69B50" />
      <DxValueAxis :max-value-margin="0.01">
        <DxVisualRange :start-value="0" />
        <DxLabel :customize-text="customizeText" />
        <DxConstantLine :width="2" :value="TrendLine" color="#FF7A00" dash-style="dash">
          <DxLabel text="Trend" horizontal-alignment="right">
            <DxFont :size="14" color="#FF7A00" weight="normal" family="suit" />
          </DxLabel>
        </DxConstantLine>
      </DxValueAxis>
      <DxLegend
          vertical-alignment="top"
          horizontal-alignment="center"
          item-text-position="bottom"
      />
      <DxExport :enabled="true" />
      <DxTooltip :enabled="true" :shared="true" :customize-tooltip="customizeTooltip" />
    </DxChart>
  </div>
</template>
<style lang="scss">
</style>
