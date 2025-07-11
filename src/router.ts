import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map-loca',
    name: 'MapLoca',
    component: () => import(/* webpackChunkName: "about" */ '@/views/map/MapLoca.vue')
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Console/Console.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }