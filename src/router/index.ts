import { createRouter, createWebHistory } from 'vue-router'
import RouteNameEnum from '../common/route'

const routes = [
  {
    path: '/',
    component: () => import("../pages/Home.vue"),
    children: [
      {
        path: '',
        name: RouteNameEnum.Users,
        component: () => import("../pages/users/Users.vue"),
      },
      {
        path: '/users-details/:id',
        name: RouteNameEnum.UsersDetails,
        component: () => import("../pages/users/UsersDetails.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
