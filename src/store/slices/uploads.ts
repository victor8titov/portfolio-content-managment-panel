import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ImageView } from '../../api/types/image.types'
import * as restApi from '../../api'
import { errorSerialization } from '..'

export type UploadState = {
  image: ImageView | null
}

const initState: UploadState = {
  image: null
}

const uploadImage = createAsyncThunk(
  'uploadImage',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await restApi.upload.image(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const uploadSlice = createSlice({
  name: 'upload',
  initialState: initState,
  reducers: {
    clear (state) {
      state.image = initState.image
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.image = payload
      })
  }
})

export default uploadSlice.reducer

export const uploadAction = {
  ...uploadSlice.actions,
  uploadImage
}
