import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ImageView } from '../../api/types/image.types'
import * as restApi from '../../api'
import { Pagination } from '../../types/common'
import { errorSerialization } from '../utils'
import { ActionAddMatcher } from './alert'

export type GalleryState = {
  images: ImageView[] | []
  pagination: Pagination | null
  image: ImageView | null
  isLoading: boolean
  isRotten: boolean
}

const initState: GalleryState = {
  image: null,
  images: [],
  pagination: null,
  isLoading: false,
  isRotten: true
}

const fetchImages = createAsyncThunk(
  'fetchImages',
  async (payload: { page?: number, pageSize?: number } | undefined, { rejectWithValue }) => {
    try {
      const page = payload?.page || 1
      const pageSize = payload?.pageSize || 10
      const response = await restApi.image.getList({ page, pageSize })
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const deleteImage = createAsyncThunk(
  'deleteImage',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await restApi.image.delete(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.fulfilled, (state, { payload }) => {
        state.images = payload.items || []
        state.pagination = payload.pagination || null
        state.isRotten = false
      })
      .addCase(fetchImages.rejected, (state) => {
        state.isRotten = false
      })
      .addCase(deleteImage.fulfilled, (state) => {
        state.isRotten = true
      })
      .addMatcher(
        (action): action is ActionAddMatcher => /Image.+\/(rejected|fulfilled)/.test(action.type),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        (action): action is ActionAddMatcher => /Image.+\/pending/.test(action.type),
        (state) => {
          state.isLoading = true
        }
      )
  }
})

export default gallerySlice.reducer

export const galleryActions = {
  ...gallerySlice.actions,
  fetchImages,
  deleteImage
}
