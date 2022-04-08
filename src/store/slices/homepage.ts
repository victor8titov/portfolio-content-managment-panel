import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '..'
import { HomePageCreation, HomePageMultilingualResponse } from '../../api/types/homepage.types'

export type HomePageState = {
  data: HomePageMultilingualResponse | null
}

const initialHomePageState: HomePageState = {
  data: null
}

const fetchHomePage = createAsyncThunk(
  'fetchHomePage',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await restApi.homepage.getMultilingual()
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const updateHomePage = createAsyncThunk(
  'updateHomePage',
  async (payload: HomePageCreation, { rejectWithValue }) => {
    try {
      const response = await restApi.homepage.put(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: initialHomePageState,
  reducers: {
    clear (state) {
      state.data = initialHomePageState.data
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePage.fulfilled, (state, { payload }) => {
        state.data = payload
      })
  }
})

export default homePageSlice.reducer

export const HomePageActions = {
  ...homePageSlice.actions,
  fetchHomePage,
  updateHomePage
}
