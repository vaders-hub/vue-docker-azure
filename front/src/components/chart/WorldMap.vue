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

export const countries = {
  Russia: { totalArea: 17.12, color: '#1E90FF' },
  Canada: { totalArea: 9.98, color: '#B8860B' },
  China: { totalArea: 9.59, color: '#BDB76B' },
  'United States': { totalArea: 9.52, color: '#FFA07A' },
  Brazil: { totalArea: 8.51, color: '#3CB371' },
  Australia: { totalArea: 7.69, color: '#D8BFD8' },
  India: { totalArea: 3.29, color: '#DB7093' },
  Argentina: { totalArea: 2.78, color: '#FFD700' },
  Kazakhstan: { totalArea: 2.72, color: '#CD5C5C' },
  Algeria: { totalArea: 2.38, color: '#B0C4DE' },

  'Trinidad and Tobago': { totalArea: 2.38, color: 'black' },
  'Papua New Guinea': { totalArea: 2.38, color: 'red' },
  "Côte d'Ivoire": { totalArea: 2.38, color: 'red' },
  'Dem. Rep. Korea': { totalArea: 2.38, color: 'red' },
}

export default {
  components: {
    DxVectorMap,
    DxLayer,
    // DxSource,
    DxTooltip,
    DxBorder,
    DxFont,
  },
  data() {
    return {
      worldData: mapsData.world,
      bounds: [-180, 85, 180, -60],
    }
  },
  methods: {
    customizeTooltip(info) {
      const name = info.attribute('name')
      const country = countries[name]
      if (country) {
        return {
          text: `${name}: ${country.totalArea}M km&#178`,
          color: country.color,
        }
      }
      return null
    },

    click({ target }) {
      let mapNm = ''
      mapsData.world.features.forEach((i) => {
        mapNm += i.properties.name + ','
      })
      console.log(mapNm)
      var test = document.getElementsByClassName('dxm-control-bar')

      if (target && countries[target.attribute('name')]) {
        target.selected(!target.selected())
      }
    },

    customizeLayer(elements) {
      elements.forEach((element) => {
        const country = countries[element.attribute('name')]
        if (country) {
          element.applySettings({
            color: country.color,
            hoveredColor: '#e0e000',
            selectedColor: '#008f00',
          })
        }
      })
    },
  },
}
</script>
<template>
  <DxVectorMap id="vector-map" :bounds="bounds" @click="click">
    <DxLayer :data-source="worldData" :customize="customizeLayer" />
    <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
      <DxBorder :visible="true" />
      <DxFont color="#fff" />
    </DxTooltip>
  </DxVectorMap>
</template>
<style lang="scss">
#vector-map {
  height: 710px;
  width: 1440px;
}
</style>
