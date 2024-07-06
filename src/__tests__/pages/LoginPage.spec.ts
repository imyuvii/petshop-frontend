import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useRouter } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from '@/stores/auth'
import { setActivePinia, createPinia } from 'pinia'
import { setupMockAdapter, mockAuthResponses } from '../mockUtils'
import flushPromises from 'flush-promises'

const vuetify = createVuetify({ components, directives })
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

const mockRouter = {
  push: vi.fn()
}

describe('LoginPage', () => {
  let mock: any

  beforeEach(() => {
    setActivePinia(createPinia())
    mock = setupMockAdapter()
    mockAuthResponses(mock, API_BASE_URL)
    ;(useRouter as any).mockReturnValue(mockRouter)
    mockRouter.push.mockClear()
  })

  test('renders login form', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.html()).toContain('Log In')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  test('displays error on login failure', async () => {
    const authStore = useAuthStore()
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [vuetify]
      }
    })

    await wrapper.find('input[type="email"]').setValue('wrong@example.com')
    await wrapper.find('input[type="password"]').setValue('wrongpassword')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()
    expect(authStore.token).toBe(null)
    expect(wrapper.find('.v-alert').exists()).toBe(true)
    expect(wrapper.find('.v-alert').text()).toContain(
      'Login failed. Please check your email and password.'
    )
  })

  test('logs in successfully', async () => {
    const authStore = useAuthStore()
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [vuetify]
      }
    })

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password')
    await wrapper.find('form').trigger('submit.prevent')

    expect(authStore.token).toBe('mock-token')
    expect(localStorage.getItem('token')).toBe('mock-token')
  })
})
