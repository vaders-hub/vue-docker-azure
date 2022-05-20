<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted, inject } from 'vue'
import {
  DxDiagram,
  DxToolbox,
  DxMainToolbar,
  DxCommand,
  DxContextMenu,
  DxContextToolbox,
  DxViewToolbar,
  DxHistoryToolbar,
  DxToolboxGroup,
  DxPageSize,
  DxZoomLevel,
  DxAutoLayout,
  DxPropertiesPanel,
  DxGroup,
  DxTab,
} from 'devextreme-vue/diagram'

export default defineComponent({
  name: 'Diagram-1',
  components: {
    DxDiagram,
    DxToolbox,
    DxMainToolbar,
    DxCommand,
    DxContextMenu,
    DxContextToolbox,
    DxPropertiesPanel,
    DxViewToolbar,
    DxHistoryToolbar,
    DxToolboxGroup,
    DxGroup,
    DxTab,
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

      if (items.length > 0) {
        const [{ id, text, type }] = items
        if (type && type !== 'text') {
          alert(`${id} : ${text} : ${type}`)
        }
      }
      // const filteredItems = items
      //   .filter((item) => item.itemType === 'shape')
      //   .map((item) => item.text)

      // if (filteredItems.length > 0) {
      //   selectedItemNames = filteredItems.join(', ')
      // }
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
    <!-- @request-edit-operation="onLayoutChanged" -->
    <!-- @selection-changed="onSelectionChanged" -->
    <!-- <DxZoomLevel :value="1" /> -->
    <DxDiagram
      id="diagram"
      ref="diagram"
      @selection-changed="onSelectionChanged"
      @request-edit-operation="onLayoutChanged"
      @content-ready="onContentReady"
      :readOnly="true"
      :autoZoomMode="'fitContent'"
      :showGrid="false"
    >
      <DxToolboxGroup :visible="false" />
      <DxContextMenu
        :visible="false"
        :enabled="false"
        :commands="['bringToFront', 'sendToBack', 'lock', 'unlock']"
      />
      <DxContextToolbox
        :visible="false"
        :enabled="false"
        :category="'flowchart'"
        :shape-icons-per-row="5"
        :width="200"
      />
      <DxPropertiesPanel :visibility="'disabled'">
        <DxTab>
          <DxGroup
            :title="'Page Properties'"
            :commands="['pageSize', 'pageOrientation', 'pageColor']"
          />
        </DxTab>
      </DxPropertiesPanel>
      <DxHistoryToolbar :visible="false" />
      <DxViewToolbar :visible="false" />
      <DxMainToolbar :visible="false">
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
      <DxToolbox :visibility="'disabled'" />
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
