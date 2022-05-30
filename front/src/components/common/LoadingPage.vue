<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

type SorE = 'success' | 'error'

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
    const divClass = ref('pageLoaderWrap visible')
    const status: SorE = 'success'
    const percent = ref(0)
    const color = '#2d8cf0'
    const failedColor = '#ed3f14'
    let _loadingInterval = 0

    const start = () => {
      percent.value = 0
      divClass.value = 'pageLoaderWrap visible'
      _loadingInterval = setInterval(() => {
        percent.value < 101 ? (percent.value += 10) : (percent.value = 100)
      }, 100)
    }

    const stop = () => {
      percent.value = 100
      setTimeout(() => {
        percent.value = 0
        divClass.value = 'pageLoaderWrap hidden'
      }, 1000)
      clearInterval(_loadingInterval)
    }

    type styleType = { width: string; backgroundColor?: string }
    const styles = computed(() => {
      let style: styleType = {
        width: '',
        backgroundColor: '',
      }

      style.width = `${percent.value}%`

      switch (String(status)) {
        case 'success':
          style.backgroundColor = color
          break
        case 'error':
          style.backgroundColor = failedColor
          break
      }
      return style
    })

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        newVal === false ? stop() : start()
      },
    )
    return { divClass, percent, styles }
  },
})
</script>
<template>
  <div :class="divClass">
    <div class="loading-bar">
      <div class="inner" :style="styles"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pageLoaderWrap.visible {
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.5s linear;
  p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .loading-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    & .inner {
      transition: width 0.2s linear;
      height: 5px;
    }

    & .color-primary {
      background-color: #337ab7;
    }

    & .color-error {
      background-color: #ed3f14;
    }
  }
}
.pageLoaderWrap.hidden {
  display: none;
}

.on-success {
  background-color: #2d8cf0;
}
.on-error {
  background-color: #ed3f14;
}
</style>
