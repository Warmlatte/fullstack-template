import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

<<<<<<< HEAD
export default router
=======
export default router
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
