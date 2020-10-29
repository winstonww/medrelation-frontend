import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../views/Home'
import SearchPage from '../views/SearchPage'
import InvalidPath from '../views/InvalidPath'
import SearchResults from '../views/SearchResults'
import Register from '../views/Register'
import Login from '../views/Login'
import QuestionInfoView from '../views/QuestionInfoView'
import store from "../store"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search/:searchTerm',
    name: 'search',
    component: SearchResults,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/info/:questionid',
    name: 'info',
    component: QuestionInfoView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    name: 'invalidPath',
    component: InvalidPath,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false
    },
    beforeEnter: (to, from, next) => {
      if (!store.getters.getIsLoggedIn) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async function(to, from, next) {
  let loggedIn = await store.dispatch("fetchIsLoggedIn")
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // You can use store variable here to access globalError or commit mutation 
      if (!loggedIn) {
        console.log("in getIsLoggedIn")
        next("/login")
      } else {
        next()
      }
  } else {
      next()
  }
})

export default router
