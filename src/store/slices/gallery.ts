import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ImageView } from '../../api/types/image.types'
import * as restApi from '../../api'
import { errorSerialization } from '..'
import { Pagination } from '../../types/common'

export type GalleryState = {
  images: ImageView[] | []
  pagination: Pagination | null
  image: ImageView | null
}

const initState: GalleryState = {
  image: null,
  images: [],
  pagination: null
}

const fetchImages = createAsyncThunk(
  'fetchImages',
  async (payload: { page?: number, pageSize?: number } | undefined, { rejectWithValue }) => {
    try {
      const response = await restApi.image.getList(payload || {})
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const fetchImage = createAsyncThunk(
  'fetchImage',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await restApi.image.get(id)
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
  reducers: {
    clear (state) {
      state.image = initState.image
      state.images = initState.images
      state.pagination = initState.pagination
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.fulfilled, (state, { payload }) => {
        state.images = payload.items || []
        state.pagination = payload.pagination || null
      })
      .addCase(fetchImage.fulfilled, (state, { payload }) => {
        state.image = payload
      })
  }
})

export default gallerySlice.reducer

export const galleryActions = {
  ...gallerySlice.actions,
  fetchImages,
  fetchImage,
  deleteImage
}
