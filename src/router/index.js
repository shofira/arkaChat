import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashScreen from '../views/SplashScreen.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
