import axios, { AxiosResponse } from 'axios'
import { TokenRefreshRequest, applyAuthTokenInterceptor, setAuthTokens, clearAuthTokens } from 'axios-jwt'
import { AuthLoginBodyRequest, AuthLoginResponse, AuthLogoutQueryRequest, GetUserBodyResponse } from './index.types'

const instance = axios.create({
  baseURL: REST_API_URL
})

// define token refresh function
const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {
  // perform refresh
  const response = await axios.post(`${REST_API_URL}/api/auth/refresh-token/`, { refreshToken })

  return response.data.token
}

const authTokenInterceptorConfig = {
  header: 'Authorization',
  headerPrefix: 'Bearer ',
  requestRefresh
}

// add interceptor to instance
applyAuthTokenInterceptor(instance, authTokenInterceptorConfig)

export const auth = {
  login: async (payload: AuthLoginBodyRequest): Promise<void> => {
    const { data: { token, refreshToken } }: AxiosResponse<AuthLoginResponse> = await axios.post<AuthLoginResponse>(`${REST_API_URL}/api/auth/login`, payload)

    // save tokens to storage
    setAuthTokens({ accessToken: token, refreshToken: refreshToken })
  },
  logout: async (payload?: AuthLogoutQueryRequest): Promise<void> => {
    try {
      if (payload) await instance.delete(`${REST_API_URL}/api/auth/logout/?username=${encodeURI(payload.username)}`)
    } finally {
      clearAuthTokens()
    }
  },
  clearTokens: (): void => clearAuthTokens()
}

export const user = {
  get: async (): Promise<AxiosResponse<GetUserBodyResponse>> => {
    return await instance.get<GetUserBodyResponse, any>(`${REST_API_URL}/api/user`)
  }
}
