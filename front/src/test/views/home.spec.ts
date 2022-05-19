import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { createTestingPinia } from '@pinia/testing'
import { useMainStore } from '@/store/index'

const apiService = {}
const msg = 'new message'
const wrapper = mount(Home, {
  global: {
    plugins: [createTestingPinia()],
    provide: {
      apiService,
    },
  },
  props: { msg },
})
const store = useMainStore()

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({ name: 'Home' })),
}))

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const counterStore = useMainStore()
    expect(wrapper.text()).toMatch(msg)
  })
})
