import { createApp } from 'vue'
import { createPinia } from 'pinia'
import apiInstance from '@/utils/apiInstance'
import setupInterceptors from '@/utils/setupInterceptors'
import router from './router'
import api from '@/plugins/api'
import socket from '@/plugins/socket'
import timer, { sesssionTimeOut } from '@/plugins/timer'
import inputEvents from '@/plugins/inputEvents'
import App from './App.vue'
import mainLayout from '@/layouts/Main.vue'
import defaultLayout from '@/layouts/Default.vue'
import adminLayout from '@/layouts/Admin.vue'
import jquery from 'jquery'

import 'devextreme/dist/css/dx.light.css'

import type { AxiosInstance } from 'axios'
import type { PiniaPluginContext } from 'pinia'

const app = createApp(App)
const Pinia = createPinia()

function myPiniaPlugin({ store }: PiniaPluginContext) {
  store.api = apiInstance as AxiosInstance
  store.sto = sesssionTimeOut
}
Pinia.use(myPiniaPlugin)

app.use(Pinia)
app.use(router)
app.use(api)
app.use(socket)
app.use(timer)
app.use(inputEvents)

app.component('Default', defaultLayout)
app.component('Main', mainLayout)
app.component('Admin', adminLayout)

setupInterceptors(app)
window.$ = jquery

app.mount('#app')
