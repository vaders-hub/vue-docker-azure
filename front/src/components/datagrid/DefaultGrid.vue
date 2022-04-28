<script lang="ts">
import { defineComponent, computed, ref, reactive, onMounted } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import { DxDataGrid, DxPager, DxPaging } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'
import DxCheckBox from 'devextreme-vue/check-box'
import DxButton from 'devextreme-vue/button'

export default defineComponent({
  name: 'DefaultGrid',
  components: {
    DxDataGrid,
    DxPager,
    DxPaging,
    DxCheckBox,
    DxSelectBox,
    DxButton,
  },
  setup() {
    const dashboardStore = useDashboardStore()
    const loadedData = ref([])
    const loadData = async () => {
      await dashboardStore.loadTableData('')
      loadedData.value = []
      loadedData.value = loadedData.value.concat(dashboardStore.tableData)
    }

    const gridContainer = ref(null)

    const displayModes = [
      { text: "Display Mode 'full'", value: 'full' },
      { text: "Display Mode 'compact'", value: 'compact' },
    ]
    const displayMode = ref('full')
    const pageSizes = [5, 10, 'all']
    const showPageSizeSelector = ref(true)
    const showInfo = ref(true)
    const showNavButtons = ref(true)
    const isCompactMode = computed(() => (displayMode.value !== 'full' ? true : false))
    const customizeColumns = (columns) => {
      columns[0].width = 70
    }

    onMounted(() => {
      loadData()
    })

    return {
      loadData,
      loadedData,
      gridContainer,
      displayModes,
      displayMode,
      pageSizes,
      showPageSizeSelector,
      showInfo,
      showNavButtons,
      isCompactMode,
      customizeColumns,
    }
  },
})
</script>
<template>
  <div id="grid-demo">
    <div>
      <DxButton text="Load data" type="normal" styling-mode="outlined" @click="loadData()" />
    </div>
    <!-- <p>:customize-columns="customizeColumns"</p> -->
    <DxDataGrid
      id="gridContainer"
      ref="gridContainer"
      :data-source="loadedData"
      :column-auto-width="true"
      key-expr="id"
      :show-borders="true"
    >
      <DxPaging :page-size="10" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        :display-mode="displayMode"
        :show-page-size-selector="showPageSizeSelector"
        :show-info="showInfo"
        :show-navigation-buttons="showNavButtons"
      />
    </DxDataGrid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option-container">
        <div class="option">
          <DxSelectBox
            id="dispalyModes"
            :items="displayModes"
            display-expr="text"
            value-expr="value"
            v-model:value="displayMode"
          />
        </div>
        <div class="option">
          <DxCheckBox
            id="showPageSizes"
            text="Show Page Size Selector"
            v-model:value="showPageSizeSelector"
          />
        </div>
        <div class="option">
          <DxCheckBox
            id="showInfo"
            text="Show Info Text"
            :disabled="isCompactMode"
            v-model:value="showInfo"
          />
        </div>
        <div class="option">
          <DxCheckBox
            id="showNavButtons"
            text="Show Navigation Buttons"
            :disabled="isCompactMode"
            v-model:value="showNavButtons"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
