<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import {
  DxPieChart,
  //DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  //DxFormat,
  //DxConnector,
  //DxExport,
} from 'devextreme-vue/pie-chart'

import type { PropType } from 'vue'
import type { DoughnutOptions } from '@/interface/common'

export default defineComponent({
  name: 'Doughnut',
  props: {
    Options: {
      type: Object as PropType<DoughnutOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
  },
  setup(context) {
    const customizeTooltip = (data) => {
      const site = data.argument
      const seriesNm = data.seriesName
      const value = data.value

      return {
        html: `<div>
                <div class='tooltip-header'>SITE: ${site}</div>
                <div class='tooltip-body'>
                  <div class='tooltip-value'>${seriesNm}: ${value}</div>
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
    <DxPieChart
      id="doughnut_chart"
      :data-source="Options.loadedData"
      :inner-radius="0.2"
      type="doughnut"
      :palette="[
        '#d9745f',
        '#d9895f',
        '#e69b50',
        '#e9b150',
        '#f3c848',
        '#d1cead',
        '#e8e5d3',
        '#c0d4c2',
        '#97afac',
        '#a29183',
      ]"
    >
      <DxLegend
        :visible="true"
        horizontal-alignment="center"
        vertical-alignment="top"
        item-text-position="left"
      />
      <!-- <DxCommonSeriesSettings>
        <DxLabel :visible="false" />
      </DxCommonSeriesSettings> -->
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" format="currency" />
      <DxSeries name="Import" argument-field="Country" value-field="Import" />
      <DxSeries name="Export" argument-field="Country" value-field="Export" />
    </DxPieChart>
  </div>
</template>
<style lang="scss"></style>
