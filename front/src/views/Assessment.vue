<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import Diagram1 from '@/components/chart/Diagram-1.vue'

import type { LineOptions } from '@/interface/common'

export default defineComponent({
  name: 'Assessment',
  components: {
    Header,
    Footer,
    Diagram1,
  },
  setup(context) {
    return {}
  },
})
</script>

<template>
  <Header />
  <section class="contents">
    <div class="page-top">
      <div class="page-top__header">
        <h1 class="page-top__title">Assessment</h1>
      </div>
    </div>
    <div class="diagram-wrap">
      <Diagram1 />
    </div>
  </section>
  <Footer />
</template>
<style lang="scss">
.diagram-wrap {
  width: 670px;
  height: 500px;
  padding: 0;
  overflow: hidden;
  .dx-diagram {
    border: none;
    .dxdi-canvas {
      background-color: #fff !important;
      .dxdi-page-shadow {
        display: none;
      }

      .dxdi-main {
        transform: translate(0px, 0px);
      }
    }
  }
}
</style>
