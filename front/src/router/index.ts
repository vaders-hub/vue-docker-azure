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
    meta: { layout: 'Default' },
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/assessment',
    name: 'Assessment',
    meta: { layout: 'Default' },
    component: () => import('@/views/Assessment.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { layout: 'Admin' },
    component: () => import('@/views/admin/Index.vue'),
    children: [
      {
        path: 'code',
        name: 'Code',
        component: () => import('@/views/admin/CodeManagement.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/admin/UserManagement.vue'),
      },
    ],
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
  if (to.meta.layout) mainStore.changeLayout(to.meta.layout)

  next()
})

router.beforeResolve((to, from, next) => {
  const mainStore = useMainStore()

  mainStore.changeLoadingpageStatus(false)

  next()
})

export default router
