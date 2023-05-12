import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Laout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 配置路径和组件对应关系的位置
    {
      path: '/',
      name: 'laout',
      component: Laout,
      children: [{
        path: '/home||/',
        name: 'home',
        component: Home
      }, {
        path: '/category',
        name: 'category',
        component: Category
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
})

export default router
