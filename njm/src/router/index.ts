import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export function router(lang: string) {
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/instances',
      name: 'Instances',
      component: () => import('../views/Instances.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ];
  
  return createRouter({
    history: createWebHistory(`/${lang}/`),
    routes
  });
}
