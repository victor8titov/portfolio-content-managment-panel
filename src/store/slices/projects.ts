import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { Language, Pagination } from '../../types/common'
import { ProjectCreation, ProjectView, ProjectViewMultilingual } from '../../api/types/projects'
import { QueryParameters } from '../../api/types/common'

export type ProjectState = {
  projects: ProjectView[]
  project: ProjectViewMultilingual | null
  pagination: Pagination | null
}

const initialState: ProjectState = {
  project: null,
  projects: [],
  pagination: null
}

const fetchProjects = createAsyncThunk(
  'fetchProjects',
  async ({ page = 1, pageSize = 10, language = Language.EN }: QueryParameters, { rejectWithValue }) => {
    try {
      const response = await restApi.projects.getList({ page, pageSize, language })
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const fetchProjectById = createAsyncThunk(
  'fetchProjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.projects.getByIdMultilingual(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const createProject = createAsyncThunk(
  'createProject',
  async (payload: ProjectCreation, { rejectWithValue }) => {
    try {
      const response = await restApi.projects.create(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const updateProject = createAsyncThunk(
  'updateProject',
  async (payload: ProjectCreation & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload

      const response = await restApi.projects.update(id, rest)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const deleteProject = createAsyncThunk(
  'deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restApi.projects.delete(id)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const projectSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.project = initialState.project
      state.projects = initialState.projects
      state.pagination = initialState.pagination
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, { payload }) => {
        state.projects = payload.items
        state.pagination = payload.pagination || null
      })
      .addCase(fetchProjectById.fulfilled, (state, { payload }) => {
        state.project = payload
      })
  }
})

export default projectSlice.reducer

export const projectsAction = {
  ...projectSlice.actions,
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject
}
