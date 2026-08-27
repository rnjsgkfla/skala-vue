import { createRouter, createWebHistory } from 'vue-router'

import NotFoundView from '@/views/NotFoundView.vue'
import WeatherAboutView from '@/views/WeatherAboutView.vue'
import WeatherDetailView from '@/views/WeatherDetailView.vue'
import WeatherGuideView from '@/views/WeatherGuideView.vue'
import WeatherHomeView from '@/views/WeatherHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeatherHome',
      component: WeatherHomeView,
    },
    {
      path: '/about',
      name: 'WeatherAbout',
      component: WeatherAboutView,
    },
    {
      path: '/guide',
      name: 'WeatherGuide',
      component: WeatherGuideView,
    },
    {
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: WeatherDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
