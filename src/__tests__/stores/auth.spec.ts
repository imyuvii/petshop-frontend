import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth'
import { mockAuthResponses } from '../mockUtils'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

describe('Auth Store', () => {
  let mock: any

  beforeEach(() => {
    setActivePinia(createPinia())
    mock = new MockAdapter(axios)
    mockAuthResponses(mock, API_BASE_URL)
  })

  it('logs in successfully', async () => {
    const authStore = useAuthStore()
    const result = await authStore.login('test@example.com', 'password')

    expect(result).toBe(true)
    expect(authStore.token).toBe('mock-token')
    expect(localStorage.getItem('token')).toBe('mock-token')
  })

  it('logs out successfully', async () => {
    const authStore = useAuthStore()
    authStore.token = 'mock-token'
    localStorage.setItem('token', 'mock-token')

    await authStore.logout()

    expect(authStore.token).toBe(null)
    expect(localStorage.getItem('token')).toBe(null)
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.get[0].url).toBe(`${API_BASE_URL}/admin/logout`)
  })
})
