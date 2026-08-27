import { createRouter, createWebHistory } from 'vue-router'

import FinalWeatherView from '@/views/FinalWeatherView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import WeatherAboutView from '@/views/WeatherAboutView.vue'
import WeatherDetailView from '@/views/WeatherDetailView.vue'
import WeatherGuideView from '@/views/WeatherGuideView.vue'
import WeatherPracticeView from '@/views/WeatherPracticeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'FinalWeather',
      component: FinalWeatherView,
    },
    {
      path: '/practice/:stage',
      name: 'WeatherPractice',
      component: WeatherPracticeView,
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
