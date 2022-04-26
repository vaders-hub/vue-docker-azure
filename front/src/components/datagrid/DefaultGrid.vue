<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { DxDataGrid, DxScrolling, DxPager, DxPaging } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'
import DxCheckBox from 'devextreme-vue/check-box'
export default defineComponent({
  name: 'DefaultGrid',
  components: {
    DxDataGrid,
    DxScrolling,
    DxPager,
    DxPaging,
    DxCheckBox,
    DxSelectBox,
  },
  setup() {
    let s = 123456789
    const random = () => {
      s = (1103515245 * s + 12345) % 2147483647
      return s % (10 - 1)
    }

    const generateData = (count) => {
      const surnames = [
        'Smith',
        'Johnson',
        'Brown',
        'Taylor',
        'Anderson',
        'Harris',
        'Clark',
        'Allen',
        'Scott',
        'Carter',
      ]
      const names = [
        'James',
        'John',
        'Robert',
        'Christopher',
        'George',
        'Mary',
        'Nancy',
        'Sandra',
        'Michelle',
        'Betty',
      ]
      const gender = ['Male', 'Female']
      const items: Record<string, unknown>[] = []
      const startBirthDate = Date.parse('1/1/1975')
      const endBirthDate = Date.parse('1/1/1992')

      for (let i = 0; i < count; i += 1) {
        const birthDate = new Date(
          startBirthDate + Math.floor((random() * (endBirthDate - startBirthDate)) / 10),
        )
        birthDate.setHours(12)

        const nameIndex = random()
        const item = {
          id: i + 1,
          firstName: names[nameIndex],
          lastName: surnames[random()],
          gender: gender[Math.floor(nameIndex / 5)],
          birthDate,
        }
        items.push(item)
      }
      return items
    }

    const dataSource = generateData(100000)
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

    return {
      generateData,
      dataSource,
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
    <DxDataGrid
      id="gridContainer"
      :customize-columns="customizeColumns"
      :data-source="dataSource"
      key-expr="id"
      :show-borders="true"
    >
      <DxScrolling row-rendering-mode="virtual" />
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
