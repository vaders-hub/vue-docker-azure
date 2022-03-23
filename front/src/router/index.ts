import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'Main' },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: () => import('@/views/Assessment.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()

  mainStore.changeLoadingpageStatus(true)
  if (to.name === 'Home') mainStore.changeLayout('Main')
  if (to.name !== 'Home') mainStore.changeLayout('Default')

  next()
})
router.beforeResolve((to, from, next) => {
  const mainStore = useMainStore()

  mainStore.changeLoadingpageStatus(false)

  next()
})

export default router
