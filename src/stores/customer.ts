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
    const {
      page = 1,
      itemsPerPage = 5,
      sortBy,
      name,
      email,
      phone,
      address,
      created_at,
      marketing
    } = options

    const requestParams = {
      page,
      limit: itemsPerPage,
      first_name: name,
      email,
      phone,
      address,
      created_at,
      marketing
    };
    if(sortBy) {
      requestParams.sortBy = sortBy.key
      requestParams.desc = sortBy.order == 'desc'
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

  return {
    customers,
    totalItems,
    loading,
    fetchCustomers
  }
})
