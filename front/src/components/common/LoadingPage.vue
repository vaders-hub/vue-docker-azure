<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'LoadingPage',
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {},
  setup(props) {
    const divClass = ref('pageLoaderWrap hidden')

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        divClass.value = newVal === false ? 'pageLoaderWrap hidden' : 'pageLoaderWrap'
      },
    )
    return { divClass }
  },
})
</script>
<template>
  <div :class="divClass">
    <p></p>
  </div>
</template>
<style lang="scss" scoped>
.pageLoaderWrap {
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.5);
  p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
}
div.pageLoaderWrap.hidden {
  display: none;
}
</style>
