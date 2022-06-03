<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import DxTreeView from 'devextreme-vue/tree-view'

export default defineComponent({
  name: 'DropdownMultiple',
  components: {
    DxDropDownBox,
    DxTreeView,
  },
  emits: ['drop-changed'],
  props: {
    treeName: {
      type: String,
      default: '',
    },
    treeData: {
      type: Object,
      defalut: () => ({}),
    },
  },
  setup(props: any, { emit }) {
    const propData = reactive(props.treeData)
    const treeDataSource = JSON.parse(JSON.stringify(propData))
    const treeBoxValue = ref('1')
    const isTreeBoxOpened = ref(false)
    const isGridBoxOpened = ref(false)
    const treeViewRefName = 'tree-view'

    const syncTreeViewSelection = (e) => {
      //   console.log('syncTreeViewSelection')
    }
    const treeViewItemSelectionChanged = async (e) => {
      const { items, itemData } = e.node

      treeBoxValue.value = e.component.getSelectedNodeKeys()

      emit('drop-changed', { ...items, ...itemData })
    }
    const onTreeItemClick = (e) => {
      isTreeBoxOpened.value = false
    }

    return {
      treeBoxValue,
      isGridBoxOpened,
      isTreeBoxOpened,
      treeDataSource,
      treeViewRefName,
      syncTreeViewSelection,
      treeViewItemSelectionChanged,
      onTreeItemClick,
    }
  },
})
</script>
<template>
  <DxDropDownBox
    v-model:value="treeBoxValue"
    v-model:opened="isTreeBoxOpened"
    :data-source="treeDataSource"
    value-expr="ID"
    display-expr="name"
    placeholder="Select a value..."
    @value-changed="syncTreeViewSelection($event)"
  >
    <template #content="{ data }">
      <p style="display: none">{{ data }}</p>
      <DxTreeView
        :ref="treeViewRefName"
        :data-source="treeDataSource"
        :select-by-click="true"
        :select-nodes-recursive="true"
        data-structure="plain"
        key-expr="ID"
        parent-id-expr="categoryId"
        selection-mode="multiple"
        show-check-boxes-mode="normal"
        display-expr="name"
        @item-selection-changed="treeViewItemSelectionChanged($event)"
        @item-click="onTreeItemClick($event)"
      />
    </template>
  </DxDropDownBox>
</template>
