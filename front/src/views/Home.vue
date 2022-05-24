<script lang="ts">
import { defineComponent, onMounted, computed, reactive, ref, inject } from 'vue'
import { useMainStore } from '@/store/index'
import { useRouter } from 'vue-router'
import DxTextBox from 'devextreme-vue/text-box'
import DxButton from 'devextreme-vue/button'

import type { ApiService } from '@/interface/common'

export default defineComponent({
  name: 'Home',
  components: {
    DxTextBox,
    DxButton,
  },
  props: {
    msg: { type: String, default: 'SKI LCA infra' },
  },
  setup(context) {
    const mainStore: any = useMainStore()
    const api = inject('api', (opt) => ({}), false)
    const apiService = inject<ApiService>('apiService')
    const router = useRouter()

    const loginInfo = reactive({ id: '', pw: '' })
    const isLoggedIn = computed(() => (mainStore.members.login ? true : false))
    const goGate = async () => router.push({ name: 'Gate' })
    const goDashboard = async () => router.push({ name: 'Dashboard' })
    const goAssessment = async () => router.push({ name: 'ASSESSMENT' })
    const goAdmin = async () => router.push({ path: '/admin/code' })
    const goSocket = async () => router.push({ name: 'Login' })
    const procLoginStore = () => mainStore.login(loginInfo)
    const procLogoutStore = () => mainStore.logout(false)
    const procLoginComponent = async () => {
      try {
        const user = await api({ methods: 'get', url: '/api/member', params: loginInfo })
      } catch (e) {
        console.warn(e)
      }
    }
    const procLoginComponentService = async () => apiService?.login(loginInfo)
    const procLogout = () => mainStore.logout(false)

    return {
      goGate,
      goDashboard,
      goAssessment,
      goAdmin,
      goSocket,
      procLoginStore,
      procLogoutStore,
      procLoginComponent,
      procLoginComponentService,
      procLogout,
      loginInfo,
      isLoggedIn,
    }
  },
})
</script>

<template>
  <div>
    <h2>HOME</h2>
    <p>{{ msg }}</p>
    <DxButton text="Gate" type="normal" styling-mode="outlined" @click="goGate()" />
    <DxButton text="Dashboard" type="normal" styling-mode="outlined" @click="goDashboard()" />
    <DxButton text="Assessment" type="normal" styling-mode="outlined" @click="goAssessment()" />
    <DxButton text="Admin" type="normal" styling-mode="outlined" @click="goAdmin()" />
    <DxButton text="Socket" type="normal" styling-mode="outlined" @click="goSocket()" />
    <div class="loginBox" v-if="!isLoggedIn">
      <DxTextBox placeholder="id" v-model="loginInfo.id" />
      <DxTextBox placeholder="password" v-model="loginInfo.pw" />
      <div>
        <DxButton
          text="Login - store"
          class="btn"
          type="success"
          styling-mode="outlined"
          @click="procLoginStore()"
        />
        <DxButton
          text="Logout - store"
          class="btn"
          type="danger"
          styling-mode="outlined"
          @click="procLogoutStore()"
        />
      </div>
      <div>
        <DxButton
          text="Login - component"
          class="btn"
          type="success"
          styling-mode="outlined"
          @click="procLoginComponent()"
        />
        <DxButton
          text="Login - component - service"
          class="btn"
          type="success"
          styling-mode="outlined"
          @click="procLoginComponentService()"
        />
      </div>
    </div>
    <div v-else>
      <DxButton
        text="Logout"
        class="btn"
        type="success"
        styling-mode="outlined"
        @click="procLogout()"
      />
    </div>
  </div>
</template>
<style lang="scss">
.loginBox {
  width: 25rem;
  margin: 1rem 0;
  .btn {
    margin: 0.5rem 0.2rem 0 0;
  }
}
</style>
