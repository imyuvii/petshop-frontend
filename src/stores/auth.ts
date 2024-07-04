import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: null as any
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(
          'https://pet-shop.buckhill.com.hr/api/v1/admin/login',
          `email=${email}&password=${password}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )

        if (response.data.success) {
          this.token = response.data.data.token
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          localStorage.setItem('token', this.token!)
          return true
        }
        return false
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    }
  },
  getters: {
    getToken: (state) => state.token
  }
})
