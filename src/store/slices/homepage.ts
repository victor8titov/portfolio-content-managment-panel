import { createSlice, /* createAsyncThunk, */ PayloadAction } from '@reduxjs/toolkit'

export type HomePageState = {
  title: string
}

const initialHomePageState: HomePageState = {
  title: ''
}

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: initialHomePageState,
  reducers: {
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload
    },
    clear: (state) => {
      state.title = ''
    }
  }
})

export default homePageSlice.reducer

export const HomePageActions = {
  ...homePageSlice.actions
}
