import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '@/views/404.vue';

export function router(lang: string) {
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue').catch(() => location.href = `/${lang}/`),
    },
    {
      path: '/instances',
      name: 'Instances',
      component: () => import('../views/Instances.vue').catch(() => location.href = `/${lang}/instances`),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ];
  
  return createRouter({
    history: createWebHistory(`/${lang}/`),
    routes,
    scrollBehavior() {
      return { top: 0 };
    },
  });
}
