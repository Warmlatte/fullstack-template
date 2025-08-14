import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WebSocketDemo from '../components/WebSocketDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: WebSocketDemo,
    },
  ],
})

export default router
