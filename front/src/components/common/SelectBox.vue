<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import DxSelectBox from 'devextreme-vue/select-box'

export default defineComponent({
  name: 'SelectBox',
  components: {
    DxSelectBox,
  },
  emits: ['select-changed'],
  props: {
    selectData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const propData = reactive(props.selectData)
    const simpleProducts = JSON.parse(JSON.stringify(propData))

    const valueChanged = (e) => {
      const { previousValue, value } = e
      emit('select-changed', value)
    }
    return { simpleProducts, valueChanged }
  },
})
</script>
<template>
  <DxSelectBox :items="simpleProducts" @value-changed="valueChanged" />
</template>
