import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { Language, Pagination } from '../../types/common'
import { ProjectCreation, ProjectView, ProjectViewMultilingual } from '../../api/types/projects'
import { QueryParameters } from '../../api/types/common'
import { ActionAddMatcher } from './alert'

export type ProjectState = {
  projects: ProjectView[]
  project: ProjectViewMultilingual | null
  pagination: Pagination | null
  isLoading: boolean,
  isRotten: boolean,
}

const initialState: ProjectState = {
  project: null,
  projects: [],
  pagination: null,
  isLoading: false,
  isRotten: true
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, { payload }) => {
        state.projects = payload.items
        state.pagination = payload.pagination || null
        state.isRotten = false
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.isRotten = false
      })
      .addCase(fetchProjectById.fulfilled, (state, { payload }) => {
        state.project = payload
      })
      .addCase(createProject.fulfilled, (state) => {
        state.isRotten = true
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.isRotten = true
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.isRotten = true
      })
      .addMatcher(
        (action): action is ActionAddMatcher => /Project.+\/(rejected|fulfilled)/.test(action.type),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        (action): action is ActionAddMatcher => /Project.+\/pending/.test(action.type),
        (state) => {
          state.isLoading = true
        }
      )
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
