import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

export const setupMockAdapter = () => {
  const mock = new MockAdapter(axios)
  return mock
}

export const mockAuthResponses = (mock: MockAdapter, API_BASE_URL: string) => {
  mock.onPost(`${API_BASE_URL}/admin/login`).reply((config) => {
    const params = new URLSearchParams(config.data)
    const email = params.get('email')
    const password = params.get('password')

    if (email === 'test@example.com' && password === 'password') {
      return [
        200,
        {
          success: 1,
          data: { token: 'mock-token' },
          error: null,
          errors: [],
          extra: []
        }
      ]
    } else {
      return [
        422,
        {
          success: 0,
          data: null,
          error: 'Invalid credentials',
          errors: [],
          extra: []
        }
      ]
    }
  })

  mock.onGet(`${API_BASE_URL}/admin/logout`).replyOnce(200, {
    success: 1,
    data: [],
    error: null,
    errors: [],
    extra: []
  })
}
