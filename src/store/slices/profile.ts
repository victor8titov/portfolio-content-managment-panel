import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isLoggedIn } from 'axios-jwt'
import { errorSerialization } from '..'
import * as restApi from '../../api'
import { AuthLoginBodyRequest, AuthLogoutQueryRequest } from '../../api/types/profile.types'
import { ErrorSerializable } from '../index.types'
import { ActionAddMatcher } from './alert'

export type AuthenticationVerificationStatuses = 'checking' | 'failure' | 'successfully'

export type UserState = {
  user: {
    id?: string
    name?: string
    email?: string
  } | null
  authenticationCheckStatus: AuthenticationVerificationStatuses | null
  isLoggedIn: boolean
}

const initialProfileState: UserState = {
  user: null,
  isLoggedIn: false,
  authenticationCheckStatus: null
}

const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async (payload: AuthLoginBodyRequest, { rejectWithValue }) => {
    try {
      return await restApi.auth.login(payload)
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const fetchLogout = createAsyncThunk(
  'fetchLogout',
  async (payload: AuthLogoutQueryRequest) => await restApi.auth.logout(payload)
)

const authenticationCheckStatus = createAsyncThunk(
  'authenticationCheckStatus',
  (): boolean => isLoggedIn()
)

const fetchUser = createAsyncThunk(
  'fetchUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await restApi.user.get()
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const profileSlice = createSlice({
  name: 'user',
  initialState: initialProfileState,
  reducers: {
    clearProfile (state) {
      state.authenticationCheckStatus = initialProfileState.authenticationCheckStatus
      state.user = initialProfileState.user
      state.isLoggedIn = initialProfileState.isLoggedIn
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state) => {
        state.isLoggedIn = true
        state.authenticationCheckStatus = initialProfileState.authenticationCheckStatus
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.user = initialProfileState.user
        state.authenticationCheckStatus = initialProfileState.authenticationCheckStatus
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload
      })
      .addCase(authenticationCheckStatus.fulfilled, (state, { payload }) => {
        if (payload) {
          state.isLoggedIn = true
          state.authenticationCheckStatus = initialProfileState.authenticationCheckStatus
        } else {
          state.isLoggedIn = false
          state.authenticationCheckStatus = 'failure'
        }
      })
      .addMatcher(
        (action): action is ActionAddMatcher => action.type.endsWith('/rejected'),
        (state, action) => {
          const payload = action.payload as ErrorSerializable

          if (!payload) return

          if (
            payload.messages.some(i => /401|422|422 on token refresh/.test(i)) ||
            (payload.status === 401 || payload.status === 422)
          ) {
            state.isLoggedIn = initialProfileState.isLoggedIn
          }
        }
      )
  }
})

export default profileSlice.reducer

export const profileActions = {
  ...profileSlice.actions,
  fetchLogin,
  fetchLogout,
  fetchUser,
  authenticationCheckStatus
}
