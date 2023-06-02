import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCatogory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 配置路径和组件对应关系的位置
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/category/:id',
        name: 'category',
        component: Category,
      },
      {
        path: '/category/sub/:id',
        name: 'subcategory',
        component: SubCatogory
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
      },
      {
        path: '/cartlist',
        name: 'cartlist',
        component: CartList
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
