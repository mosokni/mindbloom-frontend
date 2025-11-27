import { createRouter, createWebHistory } from 'vue-router'
import LessonsView from '../views/LessonsView.vue'
import CartView from '../views/CartView.vue'

const routes = [
  { path: '/', redirect: '/lessons' },   
  { path: '/lessons', component: LessonsView },
  { path: '/cart', component: CartView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
