import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/issue/:id',
      name: 'Issue',
      props: true,
      component: () => import('@/views/Issue.vue'),
    },
    {
      path: '/user/:id',
      name: 'User',
      props: true,
      component: () => import('@/views/User.vue'),
    },
  ],
});