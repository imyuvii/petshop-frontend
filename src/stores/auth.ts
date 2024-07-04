import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL :string = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: null as any
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/admin/login`,
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
    },
    async logout() {
      try {
        await axios.get(`${API_BASE_URL}/admin/logout`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.token = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }
  },
  getters: {
    getToken: (state) => state.token
  }
})
