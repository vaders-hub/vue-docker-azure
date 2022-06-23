<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  inject,
  watch,
  isProxy,
  toRaw,
} from 'vue'
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
  name: 'Diagram',
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
    const diagram = ref<any>({ instance: {} })

    let changedItem = ref([])
    let diagramData = reactive<DiagramType>({})
    let diagramInstance

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
      diagramInstance = e.component
    }

    const onSelectionChanged = (e) => {
      const { items } = e
      if (items.length === 0) return

      const [{ id, text, type }] = items
      changedItem.value = items
    }

    const onLayoutChanged = (e) => (diagramInstance = e.component)

    const changeDiagram = async () => {
      const [{ id }] = toRaw(changedItem.value)
      const newShapes = diagramData.shapes?.map((v: any, i) => {
        const storoked =
          !v.style || (v.style && v.style.stroke === '') || v.style.stroke === '#000'
            ? '#2b7832'
            : '#000'
        return v.key === id
          ? {
              ...v,
              style: {
                stroke: storoked,
              },
            }
          : v
      })

      diagramData.shapes = newShapes

      const activated = newShapes?.reduce((acc, el) => {
        if (el.style && el.style.stroke === '#2b7832') {
          return [...acc, el.key]
        } else {
          return acc
        }
      }, [])

      try {
        const diagramResult = await api({
          methods: 'get',
          url: '/api/member',
          params: { list: activated },
        })
      } catch (e) {
        console.warn(e)
      }

      diagramInstance.import(JSON.stringify(diagramData))
    }

    watch(
      () => changedItem.value,
      (newVal, oldVal) => {
        changeDiagram()
      },
    )

    onMounted(async () => {
      loadItem()
    })

    return {
      diagram,
      diagramInstance,
      onContentReady,
      onSelectionChanged,
      onLayoutChanged,
      changeDiagram,
    }
  },
})
</script>
<template>
  <div v-show="false">
    <button @click="changeDiagram">change</button>
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
<style lang="scss">
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

.blackStroke {
  stroke: red;
}
</style>
