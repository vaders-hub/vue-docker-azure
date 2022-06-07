<script lang="ts">
import { defineComponent, ref, defineProps } from 'vue'
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js'
import { DxVectorMap, DxLayer, DxTooltip, DxBorder, DxFont } from 'devextreme-vue/vector-map'
import { useDashboardStore } from '@/store/dashboard'
import CollectionWidget from 'devextreme/ui/collection/ui.collection_widget.base'
export default defineComponent({
  components: {
    DxVectorMap,
    DxLayer,
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
      '#64FF00',
      '#B9FF00',
      '#FFF400',
      '#FFCA00',
      '#FFA600',
      '#FF9B00',
      '#FF7900',
      '#FF5200',
      '#FF4100',
      '#FF0000',
    ]

    const customizeLayer = (worlds) => {
      let worldEmmit_data = dashboardStore.dataSet.worldEmmit_data.sort((a, b) => a.value - b.value)

      worlds.forEach((world) => {
        worldEmmit_data.forEach((data, index) => {
          let colIndex = 0

          if (worldEmmit_data.length * 0.1 >= index) colIndex = 0
          else if (worldEmmit_data.length * 0.2 >= index) colIndex = 1
          else if (worldEmmit_data.length * 0.3 >= index) colIndex = 2
          else if (worldEmmit_data.length * 0.4 >= index) colIndex = 3
          else if (worldEmmit_data.length * 0.5 >= index) colIndex = 4
          else if (worldEmmit_data.length * 0.6 >= index) colIndex = 5
          else if (worldEmmit_data.length * 0.7 >= index) colIndex = 6
          else if (worldEmmit_data.length * 0.8 >= index) colIndex = 7
          else if (worldEmmit_data.length * 0.9 >= index) colIndex = 8
          else colIndex = 9

          if (data.engNm === world.attribute('name')) {
            world.applySettings({
              color: colors[colIndex],
              hoveredColor: 'rgb(64,64,255)',
              selectedColor: 'blue',
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
