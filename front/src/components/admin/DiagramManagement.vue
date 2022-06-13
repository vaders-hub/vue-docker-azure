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
import rows from '@/store/assessment/diagram-ipc.json'

type ShapeType = {
  key: string
  locked: boolean
  zIndex: number
  type: string
  text: string
  x: number
  y: number
  width: number
  height: number
}

type DiagramType = {
  page?: {
    width: number
    height: number
    pageColor: number
    pageWidth: number
    pageHeight: number
    pageLandscape: boolean
  }
  connectors?: Record<string, unknown>[]
  shapes?: ShapeType[]
}

export default defineComponent({
  name: 'DiagramManagement',
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
    const diagram = ref<any>(null)
    let dComp = reactive({})
    let diagramData = reactive<DiagramType>({})
    let diagramInstance

    const checks = [
      { name: 'check-a', value: 'a' },
      { name: 'check-b', value: 'b' },
      { name: 'check-c', value: 'c' },
    ]

    onMounted(async () => {
      loadItem()
    })

    const loadItem = async () => {
      // const {
      //   data: { rows },
      // }: any = await api({ methods: 'get', url: '/api/data/diagram', params: {} })

      diagramData = rows
      if (diagram.value) {
        diagramInstance = diagram.value.instance
        diagramInstance.import(JSON.stringify(diagramData))
      }
    }

    const onContentReady = (e) => {
      dComp = e.component
    }

    const onSelectionChanged = ({ items }) => {}

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
      checks,
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
      :autoZoomMode="'fitContent'"
      :showGrid="false"
    >
      <DxToolboxGroup />
      <DxContextMenu :commands="['bringToFront', 'sendToBack', 'lock', 'unlock']" />
      <DxContextToolbox :category="'flowchart'" :shape-icons-per-row="5" :width="200" />
      <DxPropertiesPanel>
        <DxTab>
          <DxGroup
            :title="'Page Properties'"
            :commands="['pageSize', 'pageOrientation', 'pageColor']"
          />
        </DxTab>
      </DxPropertiesPanel>
      <DxHistoryToolbar />
      <DxViewToolbar />
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
      <DxToolbox />
      <!-- <DxPageSize :width="100" :height="100" /> -->
    </DxDiagram>
    <div class="admin-btn">
      <button @click="saveDiagram" class="btn-confirm">저장</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#diagram {
  margin-top: 40px;
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

input {
  -webkit-appearance: auto;
}

.admin-btn {
  float: right;
}
</style>
