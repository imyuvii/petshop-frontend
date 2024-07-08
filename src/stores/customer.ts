import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCustomerStore = defineStore('customer', () => {
  const authStore = useAuthStore()
  const customers = ref([])
  const totalItems = ref(0)
  const loading = ref(false)
  const router = useRouter()

  const fetchCustomers = async (options: any = {}) => {
    loading.value = true

    const requestParams: any = {
      page: options.page || 1,
      limit: options.itemsPerPage || 5,
      first_name: options.name,
      email: options.email,
      phone: options.phone,
      address: options.address,
      created_at: options.created_at,
      marketing: options.marketing
    }

    if (options.sortBy && options.sortBy.length > 0) {
      requestParams.sortBy = options.sortBy[0]
    }
    if (options.sortDesc !== undefined && options.sortDesc.length > 0) {
      requestParams.desc = options.sortDesc[0]
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/user-listing`, {
        params: requestParams
      })

      if (response.data && response.data.data) {
        customers.value = response.data.data
        totalItems.value = response.data.total
      } else {
        console.error('Unexpected API response structure:', response.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await authStore.handleUnauthorized(router)
      } else {
        console.error('Error fetching customers:', error)
      }
    } finally {
      loading.value = false
    }
  }

  const deleteCustomer = async (uuid: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/user-delete/${uuid}`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await authStore.handleUnauthorized(router)
      } else {
        console.error('Error deleting customer:', error)
      }
    }
  }

  return {
    customers,
    totalItems,
    loading,
    fetchCustomers,
    deleteCustomer
  }
})
