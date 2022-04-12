import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '..'
import { SkillCreation, SkillView, SkillViewMultilingual } from '../../api/types/skills.types'
import { Language } from '../../types/common'

export type SkillsState = {
  groups: string[]
  skills: SkillView[]
  skill: SkillViewMultilingual | null
}

const initialState: SkillsState = {
  skill: null,
  groups: [],
  skills: []
}

const fetchSkills = createAsyncThunk(
  'fetchSkills',
  async (language: Language, { rejectWithValue }) => {
    try {
      const response = await restApi.skills.getSkills(language)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const fetchSkillById = createAsyncThunk(
  'fetchSkillById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.skills.getSkillById(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const createSkill = createAsyncThunk(
  'createSkill',
  async (payload: SkillCreation, { rejectWithValue }) => {
    try {
      const response = await restApi.skills.create(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const updateSkill = createAsyncThunk(
  'updateSkill',
  async (payload: SkillCreation & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload
      const response = await restApi.skills.update(id, rest)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const deleteSkill = createAsyncThunk(
  'deleteSkill',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.skills.delete(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const SkillsSlice = createSlice({
  name: 'skills',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.groups = initialState.groups
      state.skill = initialState.skill
      state.skills = initialState.skills
    },
    clearSkill (state) {
      state.skill = initialState.skill
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.fulfilled, (state, { payload }) => {
        state.groups = payload.groups
        state.skills = payload.items
      })
      .addCase(fetchSkillById.fulfilled, (state, { payload }) => {
        state.skill = payload
      })
  }
})

export default SkillsSlice.reducer

export const skillsAction = {
  ...SkillsSlice.actions,
  fetchSkills,
  fetchSkillById,
  createSkill,
  updateSkill,
  deleteSkill
}
