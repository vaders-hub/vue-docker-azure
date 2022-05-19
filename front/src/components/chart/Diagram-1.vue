<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted, inject } from 'vue'
import {
  DxDiagram,
  DxToolbox,
  DxMainToolbar,
  DxCommand,
  DxPageSize,
  DxZoomLevel,
  DxAutoLayout,
  DxPropertiesPanel,
  DxGroup,
  DxTab,
} from 'devextreme-vue/diagram'

import type { PropType } from 'vue'
// import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Diagram-1',
  props: {},
  components: {
    DxDiagram,
    DxToolbox,
    DxMainToolbar,
    DxCommand,
  },
  emit: [],
  setup(context) {
    const api = inject('api', (opt) => ({}), false)
    const diagram: any = ref(null)

    let diagramInstance
    let dComp = reactive({})

    onMounted(async () => {
      const diagramData: any = await api({ methods: 'get', url: '/api/data/diagram', params: {} })
      if (diagram.value) {
        diagramInstance = diagram.value.instance
        diagramInstance.import(JSON.stringify(diagramData.data.rows))
      }
    })

    const onContentReady = (e) => {
      const diagramInner = e.component
    }

    let selectedItemNames = ref('Nobody has been selected')

    const onSelectionChanged = ({ items }) => {
      selectedItemNames.value = 'Nobody has been selected'

      const filteredItems = items
        .filter((item) => item.itemType === 'shape')
        .map((item) => item.text)

      if (filteredItems.length > 0) {
        selectedItemNames = filteredItems.join(', ')
      }
    }

    const onLayoutChanged = (e) => (dComp = e.component)

    const saveDiagram = async () => {
      const changed = await diagramInstance.export(dComp)
      console.log('save', JSON.parse(changed))
    }

    return {
      diagram,
      diagramInstance,
      onContentReady,
      onSelectionChanged,
      onLayoutChanged,
      saveDiagram,
    }
  },
})
</script>
<template>
  <div>
    <DxDiagram
      id="diagram"
      ref="diagram"
      @request-edit-operation="onLayoutChanged"
      @content-ready="onContentReady"
      :autoZoomMode="'fitContent'"
    >
      <DxMainToolbar :visible="true">
        <DxCommand :name="'undo'" />
        <DxCommand :name="'redo'" />
        <DxCommand :name="'separator'" />
        <DxCommand :name="'fontName'" />
        <DxCommand :name="'fontSize'" />
        <DxCommand :name="'separator'" />
        <DxCommand :name="'bold'" />
        <DxCommand :name="'italic'" />
        <DxCommand :name="'underline'" />
        <DxCommand :name="'separator'" />
        <DxCommand :name="'fontColor'" />
        <DxCommand :name="'lineColor'" />
        <DxCommand :name="'fillColor'" />
        <DxCommand :name="'separator'" />
        <DxCommand :name="'clear'" :icon="'clearsquare'" :text="'Clear Diagram'" />
      </DxMainToolbar>
      <!-- @request-edit-operation="onLayoutChanged" -->
      <!-- @selection-changed="onSelectionChanged" -->
      <!-- <DxZoomLevel :value="1" /> -->
      <DxToolbox :visibility="'visible'" />
      <!-- <DxPageSize :width="100" :height="100" /> -->
    </DxDiagram>
    <button @click="saveDiagram">save</button>
  </div>
</template>
<style scoped>
#diagram {
  height: 900px;
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
