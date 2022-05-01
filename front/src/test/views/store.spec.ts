import { mount, VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useMainStore } from '../../store/index'
import Login from '@/views/Login.vue'

// npm run test:unit -- store.spec.ts
describe('Login test', () => {
  const createWrapper = (): VueWrapper =>
    mount(Login, {
      global: {
        plugins: [createTestingPinia()],
      },
    })

  it('loads successfully', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('h2').exists()).toBe(true)
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('layout is', () => {
    const counter = useMainStore()
    expect(counter.layout).toBe('Default')
    counter.changeLayout('Main')
    expect(counter.layout).toBe('Main')
  })

})