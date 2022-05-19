<script lang="ts">
import { defineComponent, ref, reactive, onMounted, inject } from 'vue'
import {
  DxDiagram,
  DxNodes,
  DxAutoLayout,
  DxToolbox,
  DxPropertiesPanel,
  DxGroup,
  DxTab,
} from 'devextreme-vue/diagram'
import ArrayStore from 'devextreme/data/array_store'
import service from './data.js'

import type { PropType } from 'vue'
import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Line',
  props: {
    Options: {
      type: Object as PropType<LineOptions>,
      default: () => ({}),
    },
  },
  components: {
    DxDiagram,
    DxNodes,
    DxAutoLayout,
    DxToolbox,
    DxPropertiesPanel,
    DxGroup,
    DxTab,
  },
  emit: [],
  setup(context) {
    const api = inject('api', (opt) => ({}), false)
    const diagram: any = ref(null)
    const dataSource = new ArrayStore({
      key: 'ID',
      data: service.getEmployees(),
    })
    let selectedItemNames = ref('Nobody has been selected')
    let diagramInstance
    // onMounted(async () => {
    //   const diagramData: any = await api({ methods: 'get', url: '/api/data/diagram', params: {} })
    //   diagramInstance = diagram.value.instance
    //   diagramInstance.import(JSON.stringify(diagramData.data.rows))
    // })
    const onContentReady = (e) => {
      const diagram = e.component
      // preselect some shape
      const items = diagram
        .getItems()
        .filter((item) => item.itemType === 'shape' && item.text === 'Greta Sims')

      if (items.length > 0) {
        diagram.setSelectedItems(items)
        diagram.scrollToItem(items[0])
        diagram.focus()
      }
    }
    const onSelectionChanged = ({ items }) => {
      console.log('items', items)
      selectedItemNames.value = 'Nobody has been selected'
      const filteredItems = items
        .filter((item) => item.itemType === 'shape')
        .map((item) => item.text)
      if (filteredItems.length > 0) {
        selectedItemNames.value = filteredItems.join(', ')
      }
    }
    return {
      dataSource,
      selectedItemNames,
      onContentReady,
      onSelectionChanged,
    }
  },
})
</script>
<template>
  <div>
    <DxDiagram
      id="diagram"
      ref="diagram"
      @content-ready="onContentReady"
      @selection-changed="onSelectionChanged"
    >
      <DxNodes
        :data-source="dataSource"
        :key-expr="'ID'"
        :text-expr="'Full_Name'"
        :parent-key-expr="'Head_ID'"
      >
        <DxAutoLayout :type="'tree'" />
      </DxNodes>
      <DxToolbox :visibility="'disabled'" />
    </DxDiagram>
    <div class="selected-data">
      <span class="caption">Selected Items:</span>{{ ' ' }}
      <span>
        {{ selectedItemNames }}
      </span>
    </div>
  </div>
</template>
<style scoped>
#diagram {
  height: 600px;
}

.selected-data {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.selected-data .caption {
  font-weight: bold;
  font-size: 115%;
}
</style>
