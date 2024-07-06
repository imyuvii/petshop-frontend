import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import CustomersPage from '@/pages/CustomersPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import ExternalRedirect from '@/components/ExternalRedirect.vue'
import ComingSoonPage from '@/pages/ComingSoonPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardPage },
        { path: 'customers', name: 'customers', component: CustomersPage },
        {
          path: 'blog',
          name: 'blog',
          component: ExternalRedirect,
          props: { url: 'https://example.com/' }
        },
        {
          path: 'promotions',
          name: 'promotions',
          component: ExternalRedirect,
          props: { url: 'https://example.com' }
        },
        { path: 'products', name: 'products', component: ComingSoonPage }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: AuthLayout,
      children: [{ path: 'login', name: 'login', component: LoginPage }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `Petson - ${to.name || to.meta.title}`
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.getToken) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.getToken) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
