import axios, { AxiosResponse } from 'axios'
import { TokenRefreshRequest, applyAuthTokenInterceptor, setAuthTokens, clearAuthTokens } from 'axios-jwt'
import { SimpleResponse } from './types/common'
import { HomePageCreation, HomePageMultilingualResponse } from './types/homepage.types'
import { ImageView, ListImages } from './types/image.types'
import { AuthLoginBodyRequest, AuthLoginResponse, AuthLogoutQueryRequest, GetUserBodyResponse } from './types/profile.types'

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
    return await instance.get(`${REST_API_URL}/api/user`)
  }
}

export const homepage = {
  getMultilingual: async (): Promise<AxiosResponse<HomePageMultilingualResponse>> =>
    await instance.get(`${REST_API_URL}/api/homepage/multilingual`),

  post: async (payload: HomePageCreation): Promise<AxiosResponse<{ language: string, message: string }>> =>
    await instance.post(`${REST_API_URL}/api/homepage/`, payload),

  put: async (payload: HomePageCreation): Promise<AxiosResponse<{ language: string, message: string }>> =>
    await instance.put(`${REST_API_URL}/api/homepage/`, payload)
}

export const upload = {
  image: async (payload: FormData): Promise<AxiosResponse<ImageView>> =>
    await instance.post(`${REST_API_URL}/api/upload/image`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const image = {
  getList: async ({ page, pageSize }: { page?: number, pageSize?: number}): Promise<AxiosResponse<ListImages>> =>
    await instance.get(`${REST_API_URL}/api/images?${page ? 'page=' + page + '&' : ''}${pageSize ? 'pageSize=' + pageSize : ''}`),

  get: async (id: string | number): Promise<AxiosResponse<ImageView>> =>
    await instance.get(`${REST_API_URL}/api/image/${id}`),

  delete: async (id: string | number): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.delete(`${REST_API_URL}/api/image/${id}`)
}
