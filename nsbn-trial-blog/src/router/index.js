import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
  // route level code - splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/user/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/RegisterView.vue')
  },
  {
    path: '/indpost/:id',
    name: 'indpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/posts/IndividualPostView.vue')
  },
  {
    path: '/create',
    name: 'createpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/posts/CreatePost.vue')
  },
  {
    path: '/editpost/:id',
    name: 'editpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/posts/EditPost.vue')
  },
  {
    path: '/error404',
    name: 'errorfourofour',
    component: () => import(/* webpackChunkName: "about" */ '../views/errors/ErrorFourOFour.vue')
  },
  {
    path: '/error403',
    name: 'errorfourothree',
    component: () => import(/* webpackChunkName: "about" */ '../views/errors/ErrorFourOThree.vue')
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/ForgetPassword.vue')
  },
  {
    path: '/resetpassword/:id',
    name: 'resetpassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/ResetPassword.vue')
  },
  {
    path: '/deletecomment/:id',
    name: 'deletecomment',
    component: () => import(/* webpackChunkName: "about" */ '../views/DeleteComment.vue')
  },
  {
    path: '/editcomment/:id',
    name: 'editcomment',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditComment.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'errorfourofour',
    component: () => import(/* webpackChunkName: "about" */ '../views/errors/ErrorFourOFour.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
