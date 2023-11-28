import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/RegisterView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/ProfileView.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'admindashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/DashboardView.vue')
  },
  {
    path: '/indpost/:id',
    name: 'indpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndividualPostView.vue')
  },
  {
    path: '/create',
    name: 'createpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreatePost.vue')
  },
  {
    path: '/editpost/:id',
    name: 'editpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditPost.vue')
  },
  {
    path: '/error404',
    name: 'errorfourofour',
    component: () => import(/* webpackChunkName: "about" */ '../views/ErrorFourOFour.vue')
  },
  {
    path: '/error403',
    name: 'errorfourothree',
    component: () => import(/* webpackChunkName: "about" */ '../views/ErrorFourOThree.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
