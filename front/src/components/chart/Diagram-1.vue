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
import rows from '@/store/assessment/diagram.json'

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

    const onSelectionChanged = ({ items }) => {
      if (items.length > 0) {
        const [{ id, text, type }] = items
        if (type && type !== 'text') {
          alert(`${id} : ${text} : ${type}`)
        }
      }
    }

    const onLayoutChanged = (e) => (dComp = e.component)

    const changeDiagram = async () => {
      let targetIdx = 0
      const changed = {
        key: '164',
        locked: false,
        zIndex: 0,
        type: 'delay',
        text: 'LPG',
        x: 9900,
        y: 360,
        width: 1080,
        height: 1080,
        style: {
          fill: 'red',
          stroke: '#0056cf',
        },
        styleText: {
          fill: '#ffffff',
        },
      }

      if (diagramData.shapes) {
        for (const [i, value] of Object.entries(diagramData.shapes)) {
          if (changed.key === value.key) targetIdx = parseInt(i)
        }
        diagramData.shapes[targetIdx] = changed
        diagramInstance.import(JSON.stringify(diagramData))
      }
    }

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
      changeDiagram,
      saveDiagram,
      checks,
    }
  },
})
</script>
<template>
  <div>
    <button @click="changeDiagram">change</button>
    <button @click="saveDiagram">save</button>
  </div>
  <div>
    <span v-for="(item, index) in checks" :key="index">
      <input type="checkbox" :vaule="item.value" :id="`${item.value}ck`" />
      <label :for="`${item.value}ck`">{{ item.name }}</label>
    </span>
  </div>
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

input {
  -webkit-appearance: auto;
}
</style>
