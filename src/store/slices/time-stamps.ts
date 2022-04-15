import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { Language } from '../../types/common'
import { TimeStampCreation, TimeStampView, TimeStampViewMultilingual } from '../../api/types/time-stamp.types'

export type TimeStampState = {
  timeStamps: TimeStampView[]
  timeStamp: TimeStampViewMultilingual | null
}

const initialState: TimeStampState = {
  timeStamp: null,
  timeStamps: []
}

const fetchTimeStamps = createAsyncThunk(
  'fetchTimeStamps',
  async (language: Language, { rejectWithValue }) => {
    try {
      const response = await restApi.timeStamps.getAll(language)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const fetchTimeStampById = createAsyncThunk(
  'fetchTimeStampById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.timeStamps.getByIdMultilingual(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const createTimeStamp = createAsyncThunk(
  'createTimeStamp',
  async (payload: TimeStampCreation, { rejectWithValue }) => {
    try {
      const response = await restApi.timeStamps.create(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const updateTimeStamp = createAsyncThunk(
  'updateTimeStamp',
  async (payload: TimeStampCreation & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload
      const response = await restApi.timeStamps.update(id, rest)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const deleteTimeStamp = createAsyncThunk(
  'deleteTimeStamp',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.timeStamps.delete(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const TimeStampsSlice = createSlice({
  name: 'timeStamps',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.timeStamp = initialState.timeStamp
      state.timeStamps = initialState.timeStamps
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeStamps.fulfilled, (state, { payload }) => {
        state.timeStamps = payload.items
      })
      .addCase(fetchTimeStampById.fulfilled, (state, { payload }) => {
        state.timeStamp = payload
      })
  }
})

export default TimeStampsSlice.reducer

export const timeStampsAction = {
  ...TimeStampsSlice.actions,
  fetchTimeStamps,
  fetchTimeStampById,
  createTimeStamp,
  updateTimeStamp,
  deleteTimeStamp
}
