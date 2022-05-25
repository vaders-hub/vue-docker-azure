<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import {
  DxPieChart,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxConnector,
  DxExport,
} from 'devextreme-vue/pie-chart'

import type { PropType } from 'vue'
import type { SiteOptions } from '@/interface/common'

export default defineComponent({
  name: 'Site',
  props: {
    Options: {
      type: Object as PropType<SiteOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    // DxFormat,
    // DxLabel,
    // DxConnector,
    // DxExport,
  },
  setup(context) {
    const customizeTooltip = (data) => {
      const site = data.argument
      const value = data.value

      // let test = document.getElementById('pie_chart');
      // let test = document.getElementById('pie_chart')?.firstChild?.childNodes[3].firstChild?.firstChild?.firstChild
      // if(test != null) test.style.opacity = "0.0";

      return {
        html: `<div>
                <div class='tooltip-header'>SITE: ${site}</div>
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
    <DxPieChart
      id="pie_chart"
      :data-source="Options.loadedData"
      type="doughnut"
      title=""
      palette="Soft Pastel"
    >
      <DxSeries argument-field="item" value-field="value" />
      <DxLegend :margin="20" horizontal-alignment="center" vertical-alignment="top" />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
    </DxPieChart>
  </div>
</template>
<style lang="scss"></style>
