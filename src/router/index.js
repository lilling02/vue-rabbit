import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCatogory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from "@/views/Member/components/UserInfo.vue"
import UserOrder from "@/views/Member/components/UserOrder.vue"
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
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
      },
      {
        path: '/pay',
        name: 'pay',
        component: Pay
      },
      {
        path: '/paycallback',
        name: 'paycallback',
        component: PayBack
      },
      {
        path: 'member',
        component: Member,
        children: [
          {
            path: '/member/:user?',
            component: UserInfo
          },
          {
            path: 'order',
            component: UserOrder
          }
        ]
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
