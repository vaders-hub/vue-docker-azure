<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js'
import {
  DxVectorMap,
  DxLayer,
  DxSource,
  DxTooltip,
  DxBorder,
  DxFont,
} from 'devextreme-vue/vector-map'
import type { PropType } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
export default defineComponent({
  components: {
    DxVectorMap,
    DxLayer,
    // DxSource,
    DxTooltip,
    DxBorder,
    DxFont,
  },
  setup(context) {
    const worldData = mapsData.world
    const bounds = [-180, 85, 180, -60]
    const dashboardStore = useDashboardStore()

    new Promise(() => {
      dashboardStore.loadData('worldEmmit_data')
    })

    const customizeTooltip = (info) => {
      const countryNm = info.attribute('name')
      const date = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '월'
      let korNm = ''
      let value = ''

      dashboardStore.dataSet.worldEmmit_data.forEach((data) => {
        if (data.engNm === countryNm) {
          korNm = data.korNm
          value = data.value
        }
      })

      if (korNm !== '') {
        return {
          html: `<div>
                <div class='tooltip-header'>${date}</div>
                <div class='tooltip-body'>
                  <div class='tooltip-value'>${korNm}: ${value}</div>
                </div>
              </div>`,
        }
      }

      return null
    }

    const colors = [
      '#93DAFF',
      '#87CEFA',
      '#00BFFF',
      '#00A5FF',
      '#1EA4FF',
      '#1E90FF',
      '#96A5FF',
      '#86A5FF',
      '#6495ED',
      '#0078FF',
      '#0064FF',
      '#0000FF',
      '#4169E1',
      '#0064CD',
      '#5A5AFF',
      '#7B68EE',
      '#6A5ACD',
      '#0000CD',
      '#00008C',
      '#483D8B',
      '#000069',
      '#3DFF92',
      '#55EE94',
      '#66CDAA',
      '#AAEBAA',
      '#80E12A',
      '#52E252',
      '#64CD3C',
      '#13C7A3',
      '#46B4B4',
      '#20B2AA',
      '#5F9EA0',
      '#3CB371',
      '#2E8B57',
      '#228B22',
      '#497649',
      '#006400',
      '#008C8C',
      '#008080',
      '#FFB6C1',
      '#FFAAAF',
      '#FF9E9B',
      '#FF7A85',
      '#FF5675',
      '#FF82FF',
      '#FF7DB4',
      '#FF69B4',
      '#FF1493',
      '#DB7093',
      '#D7567F',
      '#C71585',
      '#CD1039',
      '#B9062F',
      '#FAEB78',
      '#FFDC3C',
      '#FFC81E',
      '#FFB400',
      '#FDCD8C',
      '#FAC87D',
      '#FFA500',
      '#FF9100',
      '#FF8200',
      '#FFA98F',
      '#FFA374',
      '#FF9473',
      '#FF7F50',
      '#CD853F',
      '#D2691E',
      '#AE5E1A',
      '#8B4513',
      '#FF9696',
      '#F08080',
      '#F56E6E',
      '#F06464',
      '#FF0000',
      '#EB0000',
      '#CD0000',
      '#CD5C5C',
      '#B90000',
      '#B22222',
      '#A52A2A',
      '#800000',
      '#CD853F',
      '#DB631F',
      '#D2691E',
      '#A0522D',
      '#8B4513',
      '#DA70D6',
      '#BA55D3',
      '#9932CC',
      '#9400D3',
      '#942894',
      '#8c008c',
      '#800080',
      '#834683',
      '#828282',
      '#98DFFF',
      '#91D8FA',
      '#0AC9FF',
      '#00AFFF',
      '#28AEFF',
      '#289AFF',
      '#A0AFFF',
      '#90AFFF',
      '#6E9FED',
      '#0A82FF',
      '#0A6EFF',
      '#3232FF',
      '#4B73E1',
      '#0A6ECD',
      '#6464FF',
      '#8572EE',
      '#7E6ECD',
      '#2828CD',
      '#14148C',
      '#52478B',
      '#1E3269',
      '#47FF9C',
      '#5FEE9E',
      '#70D2B4',
      '#B4F0B4',
      '#8AE634',
      '#5CE75C',
      '#6ED746',
      '#18CCA8',
      '#50BEBE',
      '#2ABCB4',
      '#69A8AA',
      '#46BD7B',
      '#389561',
      '#2C952C',
      '#538053',
      '#0A6E0A',
      '#0A9696',
      '#0A8A8A',
      '#FFBBC6',
      '#FFB4B9',
      '#FFA8A5',
      '#FF848F',
      '#FF607F',
      '#FF8CFF',
      '#FF87BE',
      '#FF73BE',
      '#FF1E9D',
      '#DB7A9D',
      '#DC6089',
      '#C71F8F',
      '#CD1F48',
      '#B91A4D',
      '#FAF082',
      '#FFE146',
      '#FFD228',
      '#FFBE0A',
      '#FDD296',
      '#FACD87',
      '#FFAF0A',
      '#FF9B00',
      '#FF8C0A',
      '#FFB399',
      '#FFAD7E',
      '#FF9E7D',
      '#FF895A',
      '#CD8F49',
      '#D27328',
      '#B86824',
      '#8B4F1D',
      '#FFA0A0',
      '#F08A8A',
      '#F57878',
      '#F06E6E',
      '#FF3232',
      '#EB3232',
      '#CD3C3C',
      '#CD6666',
      '#B93232',
      '#B24040',
      '#AA3E3E',
      '#803232',
      '#CD8B45',
      '#E56D29',
      '#D27328',
      '#A05C37',
      '#8B4F1D',
      '#DF75DB',
      '#BF5AD8',
      '#9E37D1',
      '#9905D8',
      '#9E329E',
      '#960a96',
      '#8a0a8a',
      '#8d508d',
      '#8c8c8c',
      '#282828',
    ]

    const customizeLayer = (worlds) => {
      worlds.forEach((world) => {
        dashboardStore.dataSet.worldEmmit_data.forEach((data, index) => {
          if (data.engNm === world.attribute('name')) {
            world.applySettings({
              color: colors[index],
              hoveredColor: '#e0e000',
              selectedColor: 'red',
            })
          }
        })
      })
    }

    const click = ({ target }) => {
      dashboardStore.dataSet.worldEmmit_data.forEach((data) => {
        if (target && data.engNm === target.attribute('name')) {
          target.selected(!target.selected())
        }
      })
    }
    return { bounds, customizeTooltip, customizeLayer, click, worldData }
  },
})
</script>
<template>
  <div>
    <DxVectorMap id="vector-map" :bounds="bounds" @click="click">
      <DxLayer :data-source="worldData" :customize="customizeLayer" />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
        <DxBorder :visible="true" />
        <DxFont color="#fff" />
      </DxTooltip>
    </DxVectorMap>
  </div>
</template>
<style lang="scss">
#vector-map {
  height: 710px;
  width: 1440px;
}
</style>
