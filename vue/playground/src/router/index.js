import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VModelView from '../views/VModelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/v-model',
      name: 'v-model',
      component: VModelView
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('../views/LifecycleView.vue')
    },
    {
      path: '/context',
      name: 'context',
      component: () => import('../views/ContextView.vue')
    },
    {
      path: '/vfor',
      name: 'vfor',
      component: () => import('../views/VForView.vue')
    }
  ]
})

export default router
