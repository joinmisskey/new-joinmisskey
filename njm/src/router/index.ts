import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

export function router(lang: string) {

  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/instances',
      name: 'Instances',
      component: () => import('../views/Instances.vue')
    }
  ];
  
  return createRouter({
    history: createWebHistory(`/${lang}/`),
    routes
  });
}
