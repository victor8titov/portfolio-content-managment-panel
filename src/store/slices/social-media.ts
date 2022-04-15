import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { SocialMediaCreation, SocialMediaView } from '../../api/types/social-media.types'

export type SocialMediaState = {
  socialMedia: SocialMediaView[]
}

const initialState: SocialMediaState = {
  socialMedia: []
}

const fetchSocialMedia = createAsyncThunk(
  'fetchSocialMedia',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await restApi.socialMedia.getList()
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const createSocialMedia = createAsyncThunk(
  'createSocialMedia',
  async (payload: SocialMediaCreation, { rejectWithValue }) => {
    try {
      const response = await restApi.socialMedia.create(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const updateSocialMedia = createAsyncThunk(
  'updateSocialMedia',
  async (payload: SocialMediaCreation & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload
      const response = await restApi.socialMedia.update(id, rest)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const deleteSocialMedia = createAsyncThunk(
  'deleteSocialMedia',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.socialMedia.delete(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.socialMedia = initialState.socialMedia
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialMedia.fulfilled, (state, { payload }) => {
        state.socialMedia = payload.items
      })
  }
})

export default socialMediaSlice.reducer

export const socialMediaAction = {
  ...socialMediaSlice.actions,
  fetchSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia
}
