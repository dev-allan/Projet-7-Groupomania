import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/accueil',
    name: 'Home',
    component: Home
  },
  {
    path: '/publish',
    name: 'publish',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Publish.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import(/* webpackChunkName: "profil" */ '../views/Profil.vue')
  },
  {
    path : '/',
    name: 'Login',
    component: () => import(/*login*/ '../views/Login.vue')
  },
  {
    path : '/multimedia',
    name: 'multimedia',
    component: () => import(/*Profil user*/ '../views/multimedia.vue')
  },
  {
    path : "/article",
    name : 'article',
    component: () => import(/*get one article*/ '../views/article.vue')
  },
  {
    path : "/moderator",
    name : 'moderator',
    component: () => import(/*get one article*/ '../views/moderation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
