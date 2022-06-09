import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/store/index'

import Dashboard from '@/views/Dashboard.vue'
import Assessment from '@/views/Assessment.vue'
import StoryLine from '@/views/StoryLine.vue'

const routes = [
  {
    path: '/',
    name: 'Gate',
    meta: { layout: 'Main' },
    component: () => import('@/views/Gate.vue'),
  },
  // {
  //   path: '/gate',
  //   name: 'Gate',
  //   meta: { layout: 'Main' },
  //   component: () => import('@/views/Gate.vue'),
  // },
  {
    path: '/intro',
    name: 'Intro',
    meta: { layout: 'Main' },
    component: () => import('@/views/Intro.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'Main' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/storyline',
    name: 'Storyline',
    meta: { layout: 'Default' },
    component: StoryLine,
  },
  {
    path: '/assessment',
    name: 'Assessment',
    meta: { layout: 'Default' },
    component: Assessment,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { layout: 'Default' },
    component: Dashboard,
  },
  {
    path: '/scope12',
    name: 'Scope 1/2',
    meta: { layout: 'Default' },
    component: () => import('@/views/Scope_1_2.vue'),
  },
  {
    path: '/scope3',
    name: 'Scope 3',
    meta: { layout: 'Default' },
    component: () => import('@/views/Scope_3.vue'),
  },
  {
    path: '/net-zero',
    name: 'Net-Zero',
    meta: { layout: 'Default' },
    component: () => import('@/views/Net-Zero.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { layout: 'Default' },
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
      {
        path: 'diagram',
        name: 'Diagram',
        component: () => import('@/views/admin/DiagramManagement.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()

  mainStore.changeLoadingpageStatus(true)
  if (to.meta.layout) mainStore.changeLayout(to.meta.layout)

  next()
})

router.afterEach((to, from, next) => {
  const mainStore = useMainStore()
  const toPath = to.path.replace('/', '')

  mainStore.changeLoadingpageStatus(false)
  mainStore.changePath(toPath)
})

export default router
