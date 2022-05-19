<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import DxPieChart, {
  DxCommonSeriesSettings,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxSubtitle,
  DxTitle,
  DxExport,
} from 'devextreme-vue/pie-chart'

export default defineComponent({
  name: 'Pie',
  components: {
    DxPieChart,
    DxCommonSeriesSettings,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxSubtitle,
    DxTitle,
    // DxExport,
  },
  setup(context) {
    const pieData = [
      { Country: 'Korea', Export: 1258, Import: 1954, },
      { Country: 'Russia', Export: 143, Import: 134, },
      { Country: 'India', Export: 384, Import: 749, },
      { Country: 'China', Export: 392, Import: 438, },
      { Country: 'Japan', Export: 291, Import: 382, },
      { Country: 'USA', Export: 1547, Import:2335, },
      { Country: 'Canada', Export: 827, Import: 912, },
      { Country: 'France', Export: 543, Import: 633, },
      { Country: 'England', Export: 468, Import: 680, },
      { Country: 'Germany', Export: 1407, Import: 1167, },
    ]

    const customizeTooltip = (pointInfo) => {
      return {
         text: `${pointInfo.argumentText}<br>${pointInfo.seriesName}: ${pointInfo.valueText}B`,
      }
    }

    return {
      pieData,
      customizeTooltip,
    }
  },
})
</script>
<template>
  <div id="pie-demo">
    <DxPieChart id="pie" :data-source="pieData" :inner-radius="0.2" type="doughnut" palette="Ocean">
      <DxTitle text="Imports/Exports of Goods and Services">
        <DxSubtitle text="(billion US$, 2012)"/>
      </DxTitle>
      <DxLegend :visible="true"/>
      <DxExport :enabled="true"/>
      <DxCommonSeriesSettings>
        <DxLable :visible="false" />
      </DxCommonSeriesSettings>
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" format="currency" />
      <DxSeries
        name="Export"
        argument-field="Country"
        value-field="Export"
      />
      <DxSeries
        name="Import"
        argument-field="Country"
        value-field="Import"
      />
    </DxPieChart>
  </div>
</template>
<style lang="scss">
  #pie {
    height: 450px;
    width: 600px;
  }
</style>
