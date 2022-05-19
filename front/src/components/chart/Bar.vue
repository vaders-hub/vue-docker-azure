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

export default defineComponent({
  name: 'Bar',
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
    const TrendLine = 400
    const dataSource = [
     {
        baseDt: "1월",
        clas1: "1000",
        scope1: 559.5,
        scope2: 197.7
      },
      {
        baseDt: "2월",
        clas1: "1000",
        scope1: 529.2,
        scope2: 184.1
      },
      {
        baseDt: "3월",
        clas1: "1000",
        scope1: 544.0,
        scope2: 177.1
      },
      {
        baseDt: "4월",
        clas1: "1000",
        scope1: 530.8,
        scope2: 177.6
      },
      {
        baseDt: "5월",
        clas1: "1000",
        scope1: 452.4,
        scope2: 183.8
      },
      {
        baseDt: "6월",
        clas1: "1000",
        scope1: 384.2,
        scope2: 166.1
      },
      {
        baseDt: "7월",
        clas1: "1000",
        scope1: 489.5,
        scope2: 188.0
      },
      {
        baseDt: "8월",
        clas1: "1000",
        scope1: 476.1,
        scope2: 171.2
      },
      {
        baseDt: "9월",
        clas1: "1000",
        scope1: 452.0,
        scope2: 161.2
      },
      {
        baseDt: "10월",
        clas1: "1000",
        scope1: 443.3,
        scope2: 160.0
      },
      {
        baseDt: "11월",
        clas1: "1000",
        scope1: 427.5,
        scope2: 160.0
      },
      {
        baseDt: "12월",
        clas1: "1000",
        scope1: 466.0,
        scope2: 167.0
      },
    ]

    const customizePoint = (data) => {
      /* if (data.value > TrendLine) {
        return { color: '#ff7c7c', hoverStyle: { color: 'grey' } };
      } */
      return { hoverStyle: { color: '#E69B50' } };
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
                  <div class='tooltip-name'>범위: ${name}</div>
                  <div class='tooltip-value'>배출량: ${value}</div>
                </div>
              </div>`,
      }
    }

    return {
      dataSource,
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
  <DxChart id="Bar_chart" :customize-point="customizePoint" :customize-label="customizeLabel" :data-source="dataSource" title="">
    <DxSeries argument-field="baseDt" value-field=scope1 type="bar" color="#E8E5D3" />
    <DxSeries argument-field="baseDt" value-field=scope2 type="bar" color="#F3C848" />
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
</template>
<style lang="scss">
  #Bar_chart {
    height: 336px;
    width: 660px;
  }
  .tooltip-header {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #c5c5c5;
  }
  .tooltip-body {
    display: inline-block;
    font-family: "suit";
    opacity: 0.6;
    line-height: 1.5;
    color: #000;
    font-weight: 500;
    font-size: 16px;
    width: 100px;
  }
</style>
