<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import DxChart, {
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxValueAxis,
  DxConstantLine,
} from 'devextreme-vue/chart'

export default defineComponent({
  name: 'Pareto',
  props: {
    idName: {
      type: String,
      default: '',
    },
  },
  components: {
    DxChart,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxValueAxis,
    DxConstantLine,
  },
  setup(context) {
    const complaintsData = [
      { complaint: 'Cold pizza', count: 780, Country: 'a', numbs: 123 },
      { complaint: 'Not enough cheese', count: 120, Country: 'b', numbs: 23 },
      { complaint: 'Underbaked or Overbaked', count: 52, Country: 'c', numbs: 67 },
      { complaint: 'Delayed delivery', count: 1123, Country: 'd', numbs: 99 },
      { complaint: 'Damaged pizza', count: 321, Country: 'e', numbs: 3 },
      { complaint: 'Incorrect billing', count: 89, Country: 'f', numbs: 15 },
      { complaint: 'Wrong size delivered', count: 222, Country: 'g', numbs: 103 },
    ]

    const energySources = [
      { value: 'count', name: 'Count' },
      { value: 'numbs', name: 'Numbs' },
    ]

    const data = complaintsData.sort((a, b) => b.count - a.count)
    const totalCount = data.reduce((prevValue, item) => prevValue + item.count, 0)
    const totalCount1 = data.reduce((prevValue, item) => prevValue + item.count, 0)
    let cumulativeCount = 0
    let cumulativeCount1 = 1

    const dataSource = data.map((item, i) => {
      cumulativeCount += item.count
      cumulativeCount1 += item.numbs
      return {
        complaint: item.complaint,
        count: item.count,
        numbs: item.numbs,
        Country: item.Country,
        cumulativePercentage: Math.round((cumulativeCount * 100) / totalCount),
        cumulativePercentage1: Math.round((cumulativeCount * 50) / totalCount1),
      }
    })

    const customizeTooltip = (pointInfo) => {
      return {
        html: `<div><div class='tooltip-header'>${pointInfo.argumentText}</div>
          <div class='tooltip-body'>
          <div class='series-name'><span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: </div>
          <div class='value-text'><span class='top-series-value'>${pointInfo.points[0].valueText}</span></div>
          <div class='series-name'><span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: </div>
          <div class='value-text'><span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% </div>
        </div></div>`,
      }
    }

    const customizePercentageText = ({ valueText }) => {
      return `${valueText}%`
    }

    return {
      complaintsData,
      data,
      totalCount,
      cumulativeCount,
      dataSource,
      energySources,
      customizeTooltip,
      customizePercentageText,
    }
  },
})
</script>
<template>
  <div :id="idName">
    <DxChart id="chart" :data-source="dataSource" palette="Harmony Light">
      <DxCommonSeriesSettings argument-field="complaint" argument1-field="Country" />
      <DxSeries
        name="Complaint frequency"
        value-field="count"
        axis="frequency"
        type="bar"
        color="#fac29a"
      />

      <DxSeries
        v-for="energy in energySources"
        :key="energy.value"
        :value-field="energy.value"
        type="spline"
        :name="energy.name"
      />

      <!-- <DxSeries
        name="Cumulative percentage"
        value-field="cumulativePercentage"
        axis="percentage"
        type="spline"
        color="#6b71c3"
      />

      <DxSeries
        name="Cumulative percentage 1"
        value-field="cumulativePercentage1"
        axis="percentage"
        type="spline"
        color="#6b71c3"
      /> -->

      <DxArgumentAxis>
        <DxLabel overlapping-behavior="stagger" />
      </DxArgumentAxis>

      <DxValueAxis :tick-interval="300" name="frequency" position="left" />
      <DxValueAxis
        :tick-interval="20"
        :show-zero="true"
        :value-margins-enabled="false"
        name="percentage"
        position="right"
      >
        <DxLabel :customize-text="customizePercentageText" />
        <DxConstantLine :value="80" :width="2" color="#fc3535" dash-style="dash">
          <DxLabel :visible="false" />
        </DxConstantLine>
      </DxValueAxis>

      <!-- <DxTooltip :enabled="true" :shared="true" :customize-tooltip="customizeTooltip" /> -->
      <DxTooltip :enabled="true" />
      <DxLegend vertical-alignment="top" horizontal-alignment="center" />
    </DxChart>
  </div>
</template>
<style lang="scss">
.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.option {
  margin-top: 10px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option > span {
  margin-right: 14px;
}

.option > .dx-widget {
  display: inline-block;
  vertical-align: middle;
}
</style>
