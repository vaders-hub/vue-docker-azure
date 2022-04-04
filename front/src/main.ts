import { createApp } from 'vue'
import { createPinia } from 'pinia'
import apiInstance from '@/services/apiInstance'
import setupInterceptors from '@/services/setupInterceptors'
import router from './router'
import api from '@/plugins/api'
import App from './App.vue'
import defaultLayout from '@/layouts/Default.vue'
import mainLayout from '@/layouts/Main.vue'
import 'devextreme/dist/css/dx.light.css'

import type { AxiosInstance } from 'axios'
import type { PiniaPluginContext } from 'pinia'

const app = createApp(App)
const Pinia = createPinia()

function myPiniaPlugin({ store }: PiniaPluginContext) {
  store.api = apiInstance as AxiosInstance
}
Pinia.use(myPiniaPlugin)

app.use(Pinia)
app.use(router)
app.use(api)

app.component('Default', defaultLayout)
app.component('Main', mainLayout)

setupInterceptors(app)

app.mount('#app')
