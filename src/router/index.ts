import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import CustomersPage from '@/pages/CustomersPage.vue'
import ProductsPage from '@/pages/ProductsPage.vue'
import ShipmentLocatorPage from '@/pages/ShipmentLocatorPage.vue'
import AllTicketsPage from '@/pages/AllTicketsPage.vue'
import BlogPage from '@/pages/BlogPage.vue'
import PromotionsPage from '@/pages/PromotionsPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardPage },
        { path: 'customers', name: 'customers', component: CustomersPage },
        { path: 'products', name: 'products', component: ProductsPage },
        { path: 'shipment-locator', name: 'shipmentLocator', component: ShipmentLocatorPage },
        { path: 'all-tickets', name: 'allTickets', component: AllTicketsPage },
        { path: 'blog', name: 'blog', component: BlogPage },
        { path: 'promotions', name: 'promotions', component: PromotionsPage }
      ]
    },
    {
      path: '/',
      component: AuthLayout,
      children: [{ path: 'login', name: 'login', component: LoginPage }]
    }
  ]
})

export default router
