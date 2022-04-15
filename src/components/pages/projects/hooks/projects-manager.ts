import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { QueryParameters } from '../../../../api/types/common'
import { ProjectView } from '../../../../api/types/projects'
import { ADMIN, pathJoin, PROJECTS } from '../../../../constants/routes'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { projectsAction } from '../../../../store/slices/projects'
import { Language, Pagination } from '../../../../types/common'

type UseProjectsManager = (language?: Language) => {
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onAddNew: () => void
  projects: ProjectView[]
  isLoading: boolean
  isDeleting: boolean
  pagination: Pagination
  onChangePage: (page: number, pageSize: number) => void
}

const useProjectsManager: UseProjectsManager = (language = Language.EN) => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const projects = useSelector((state: State) => state.projects.projects)
  const pagination = useSelector((state: State) => state.projects.pagination)

  const getProjects = useCallback(async (query: QueryParameters) => {
    try {
      setIsLoading(true)
      await dispatch(projectsAction.fetchProjects(query))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    getProjects({ page: 1, pageSize: 10, language })
    return () => {
      dispatch(projectsAction.clear())
    }
  }, [dispatch, getProjects, language])

  const onUpdate = useCallback((id: string) => {
    navigate(pathJoin(ADMIN, PROJECTS, id))
  }, [navigate])

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsDeleting(true)
      await dispatch(projectsAction.deleteProject(id))

      setIsLoading(true)
      await dispatch(projectsAction.fetchProjects({ page: 1, pageSize: 10, language }))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }, [dispatch, language])

  const onAddNew = useCallback(() => {
    navigate(pathJoin(ADMIN, PROJECTS, 'new'))
  }, [navigate])

  const onChangePage = useCallback((page: number, pageSize: number) => {
    getProjects({ page, pageSize, language })
  }, [getProjects, language])

  return {
    projects,
    onUpdate,
    onDelete,
    onAddNew,
    isLoading,
    isDeleting,
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
      totalPages: pagination?.totalPages || 0
    },
    onChangePage
  }
}

export default useProjectsManager
