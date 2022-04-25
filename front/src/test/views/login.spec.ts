import { shallowMount, VueWrapper } from '@vue/test-utils'
import socket from '@/plugins/socket'
import Login from '@/views/Login.vue'

const defaultProps = {
  iconColor: 'default',
}

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({ name: 'Login' })),
}))

describe('Component', () => {
  const createWrapper = (props = defaultProps): VueWrapper =>
    shallowMount(Login, {
      global: {
        plugins: [socket],
      },
      props,
    })

  it('loads successfully', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('h2').exists()).toBe(true)
  })
})
