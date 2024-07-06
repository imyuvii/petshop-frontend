import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

export const setupMockAdapter = () => {
  const mock = new MockAdapter(axios)
  return mock
}

export const mockAuthResponses = (mock: MockAdapter, API_BASE_URL: string) => {
  mock.onPost(`${API_BASE_URL}/admin/login`).replyOnce(200, {
    success: 1,
    data: { token: 'mock-token' },
    error: null,
    errors: [],
    extra: []
  })

  mock.onGet(`${API_BASE_URL}/admin/logout`).replyOnce(200, {
    success: 1,
    data: [],
    error: null,
    errors: [],
    extra: []
  })
}
