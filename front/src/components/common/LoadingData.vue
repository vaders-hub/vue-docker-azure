<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "LoadingData",
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {},
  setup(props) {
    const divClass = ref("dataLoaderWrap hidden");

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        divClass.value = newVal === false ? "dataLoaderWrap hidden" : "dataLoaderWrap";
      }
    );
    return { divClass };
  },
});
</script>
<template>
  <div :class="divClass">
    <p>data loading</p>
  </div>
</template>
<style lang="scss" scoped>
.dataLoaderWrap {
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 101;
  pointer-events: none;
  background-color: rgba(0, 217, 255, 0.5);
  p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
}
div.dataLoaderWrap.hidden {
  display: none;
}
</style>
