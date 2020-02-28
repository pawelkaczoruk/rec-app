import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import List from '@/views/List'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
