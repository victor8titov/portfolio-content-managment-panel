import axios, { AxiosResponse } from 'axios'
import { TokenRefreshRequest, applyAuthTokenInterceptor, setAuthTokens, clearAuthTokens } from 'axios-jwt'
import { Language } from '../types/common'
import { QueryParameters, SimpleResponse } from './types/common'
import { HomePageCreation, HomePageMultilingualResponse } from './types/homepage.types'
import { ImageView, ListImages } from './types/image.types'
import { AuthLoginBodyRequest, AuthLoginResponse, AuthLogoutQueryRequest, GetUserBodyResponse } from './types/profile.types'
import { ProjectCreation, ProjectList, ProjectViewMultilingual } from './types/projects'
import { ListSkillsResponse, SkillCreation, SkillViewMultilingual } from './types/skills.types'
import { ListTimeStamps, TimeStampCreation, TimeStampViewMultilingual } from './types/time-stamp.types'

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

export const skills = {
  getSkills: async (language?: Language): Promise<AxiosResponse<ListSkillsResponse>> =>
    await instance.get(`${REST_API_URL}/api/skills/${language ? '?language=' + language : ''}`),

  getSkillById: async (id: string): Promise<AxiosResponse<SkillViewMultilingual>> =>
    await instance.get(`${REST_API_URL}/api/skill/${id}/multilingual`),

  create: async (payload: SkillCreation): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.post(`${REST_API_URL}/api/skills/`, payload),

  update: async (id: string, payload: SkillCreation): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.put(`${REST_API_URL}/api/skill/${id}`, payload),

  delete: async (id: string): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.delete(`${REST_API_URL}/api/skill/${id}`)
}

export const timeStamps = {
  getAll: async (language: Language): Promise<AxiosResponse<ListTimeStamps>> =>
    await instance.get(`${REST_API_URL}/api/time-stamps?language=${language}`),

  create: async (payload: TimeStampCreation): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.post(`${REST_API_URL}/api/time-stamps/`, payload),

  update: async (id: string, payload: TimeStampCreation): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.put(`${REST_API_URL}/api/time-stamp/${id}`, payload),

  delete: async (id: string): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.delete(`${REST_API_URL}/api/time-stamp/${id}`),

  getByIdMultilingual: async (id: string): Promise<AxiosResponse<TimeStampViewMultilingual>> =>
    await instance.get(`${REST_API_URL}/api/time-stamp/${id}/multilingual`)
}

export const projects = {
  getList: async ({ page, pageSize, language }: QueryParameters): Promise<AxiosResponse<ProjectList>> =>
    await instance.get(`${REST_API_URL}/api/projects?page=${page}&pageSize=${pageSize}&language=${language}`),

  create: async (payload: ProjectCreation): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.post(`${REST_API_URL}/api/projects/`, payload),

  update: async (id: string, payload: ProjectCreation): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.put(`${REST_API_URL}/api/project/${id}`, payload),

  delete: async (id: string): Promise<AxiosResponse<SimpleResponse>> =>
    await instance.delete(`${REST_API_URL}/api/project/${id}`),

  getByIdMultilingual: async (id: string): Promise<AxiosResponse<ProjectViewMultilingual>> =>
    await instance.get(`${REST_API_URL}/api/project/${id}/multilingual`)
}
