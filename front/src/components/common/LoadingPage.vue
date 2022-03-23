<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "LoadingPage",
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {},
  setup(props) {
    const divClass = ref("loaderWrap");

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        divClass.value = newVal === false ? "loaderWrap hidden" : "loaderWrap";
      }
    );
    return { divClass };
  },
});
</script>
<template>
  <div :class="divClass">
    <p>page loading</p>
  </div>
</template>
<style lang="scss" scoped>
.loaderWrap {
  display: table;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
  background-color: rgba(255, 255, 0, 0.5);
  p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
}
div.loaderWrap.hidden {
  display: none;
}
</style>
