import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Home = () => import('./components/pages/home/Home.page.vue');




//Definition routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;