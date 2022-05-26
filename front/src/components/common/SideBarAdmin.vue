<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import TreeView from 'devextreme-vue/tree-view'
import { DxList } from 'devextreme-vue/list'

export default defineComponent({
  components: {
    DxList,
  },
  setup(context) {
    const router = useRouter()

    const navigation = [
      { id: 1, text: 'Code', path: 'Code', icon: 'product' },
      { id: 2, text: 'User', path: 'User', icon: 'money' },
    ]

    const onClickTree = (e) => {
      const { path } = e.itemData

      router.push({ name: path })
    }
    return {
      navigation,
      onClickTree,
    }
  },
})
</script>
<template>
  <div>
    <DxList
      :data-source="navigation"
      :active-state-enabled="false"
      :hover-state-enabled="false"
      :focus-state-enabled="false"
      :width="250"
      class="panel-list"
      @item-click="onClickTree"
    />
  </div>
</template>
