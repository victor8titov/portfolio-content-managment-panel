export type AuthLoginBodyRequest = {
  username: string
  password: string
}

export type AuthLoginResponse = {
  token: string
  refreshToken: string
}

export type AuthLogoutQueryRequest = {
  username: string
}

export type GetUserBodyResponse = {
  id?: string
  name?: string
  email?: string
}
