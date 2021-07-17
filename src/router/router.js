import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Display from '@/views/Display.vue'


const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/display',
    name: 'Display',
    component: Display
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router