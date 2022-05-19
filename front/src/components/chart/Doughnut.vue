<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import DxPieChart, {
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxConnector,
  DxExport,
} from 'devextreme-vue/pie-chart'

export default defineComponent({
  name: 'Doughnut',
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    // DxExport,
  },
  setup(context) {
    const populationByRegions = [
      { region: 'Asia', val: 4119626293 },
      { region: 'Afreca', val: 1012956064 },
      { region: 'Northern America', val: 344124520 },
      { region: 'Europe', val: 727082222 },
      { region: 'Oceania', val: 34104756 },
    ]

    const customizeTooltip = (valueText, percent) => {
      return {
        text: `${valueText} - ${(percent * 100).toFixed(2)}%`,
      }
    }

    return {
      populationByRegions,
      customizeTooltip,
    }
  },
})
</script>
<template>
  <DxPieChart
    id="pie"
    :data-source="populationByRegions"
    type="doughnut"
    title=""
    palette="Soft Pastel"
  >
    <DxSeries argument-field="region">
      <DxLabel :visible="true" format="millions">
        <DxConnector :visible="true" width="1" />
      </DxLabel>
    </DxSeries>
    <DxSmallValueGrouping :top-count="3" mode="topN" />
    <DxExport :enabled="true" />
    <DxLegend :margin="0" horizontal-alignment="center" vertical-alignment="top" />
    <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
    <DxFormat type="millions" />>
  </DxPieChart>
</template>
<style lang="scss">
#pie {
  height: 414px;
  width: 400px;
}
</style>
