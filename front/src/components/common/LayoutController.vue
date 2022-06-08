<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useMainStore } from '@/store/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'layoutController',
  components: {},
  emits: ['on-close-controller'],
  setup(props, { emit }) {
    const mainStore = useMainStore()
    const current = mainStore.current
    const items = ref<string>('')
    const scope12Model = ref<string[]>([])
    let itemsTemp = {}

    const layoutBlock: any = computed(() => {
      return mainStore.layoutBlock
    })

    // 레이아웃 업데이트
    const updateLayout = () => {
      scope12Model.value = []
      items.value = localStorage.getItem(current) || ''

      if (!items.value) return

      itemsTemp = JSON.parse(items.value)
      mainStore.updateLayoutBlock(current, itemsTemp)

      for (const item in itemsTemp) {
        if (itemsTemp[item]) scope12Model.value.push(item)
      }
    }

    // 레이아웃 저장
    const onSetLayout = () => {
      localStorage.setItem(current, JSON.stringify(itemsTemp))
      updateLayout()
    }

    const onToggleChecks = (e) => {
      const { value } = e.target
      for (const ck in itemsTemp) {
        if (ck === value) itemsTemp[ck] = !itemsTemp[ck]
      }
    }

    const onClose = (e) => {
      emit('on-close-controller')
    }

    onMounted(() => {
      updateLayout()
    })

    return {
      onSetLayout,
      layoutBlock,
      scope12Model,
      onToggleChecks,
      onClose,
    }
  },
})
</script>
<template>
  <div class="tempBox">
    layout controller <button @click="onClose">X</button>
    <div>
      <div>
        Scope 12
        <div>
          <span v-for="(index, item) in layoutBlock.scope12" :key="item">
            <label :for="`${item}-${index}`">
              <input
                type="checkbox"
                :id="`${item}-${index}`"
                :value="item"
                v-model="scope12Model"
                @change="onToggleChecks"
              />
              {{ item }}
            </label>
          </span>
        </div>
      </div>
    </div>
    <button @click="onSetLayout">save</button>
  </div>
</template>

<style lang="scss" scoped>
.tempBox {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  border: 1px solid red;
  background: #fff;
  z-index: 9999999;
  input {
    -webkit-appearance: auto;
  }
}
</style>
