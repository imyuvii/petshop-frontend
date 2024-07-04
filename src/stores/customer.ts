import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref([])
  const totalItems = ref(0)
  const loading = ref(false)

  const authStore = useAuthStore()

  const fetchCustomers = async (options: any = {}) => {
    loading.value = true

    const requestParams = {
      page: options.page || 1,
      limit: options.itemsPerPage || 5,
      first_name: options.name,
      email: options.email,
      phone: options.phone,
      address: options.address,
      created_at: options.created_at,
      marketing: options.marketing
    }

    if (options.sortBy) {
      requestParams.sortBy = options.sortBy.key
      requestParams.desc = options.sortBy.order == 'desc'
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/user-listing`, {
        params: requestParams,
        headers: {
          Authorization: `Bearer ${authStore.getToken}`
        }
      })

      if (response.data && response.data.data) {
        customers.value = response.data.data
        totalItems.value = response.data.total
      } else {
        console.error('Unexpected API response structure:', response.data)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      loading.value = false
    }
  }

  const deleteCustomer = async (uuid: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/user-delete/${uuid}`, {
        headers: {
          Authorization: `Bearer ${authStore.getToken}`
        }
      })
    } catch (error) {
      console.error('Error deleting customer:', error)
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
