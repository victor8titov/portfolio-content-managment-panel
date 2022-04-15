import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ProjectView } from '../../../../api/types/projects'
import { ADMIN, pathJoin, PROJECTS } from '../../../../constants/routes'

import { AppDispatch, State } from '../../../../store'
import { projectsAction } from '../../../../store/slices/projects'
import { Language, Pagination } from '../../../../types/common'

type UseProjectsManager = () => {
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onAddNew: () => void
  projects: ProjectView[]
  isLoading: boolean
  isDeleting: boolean
  pagination: Pagination
  onChangePage: (page: number, pageSize: number) => void
  onChangeLanguage: (language: Language) => void
}

const useProjectsManager: UseProjectsManager = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [language, setLanguage] = useState<Language>(Language.EN)

  const projects = useSelector((state: State) => state.projects.projects)
  const isLoading = useSelector((state: State) => state.projects.isLoading)
  const pagination = useSelector((state: State) => state.projects.pagination)
  const isRotten = useSelector((state: State) => state.projects.isRotten)

  useEffect(() => {
    if (isRotten && !isLoading) {
      dispatch(projectsAction.fetchProjects({ page: 1, pageSize: 10, language }))
    }
  }, [dispatch, language, isRotten, isLoading])

  const onUpdate = useCallback((id: string) => {
    navigate(pathJoin(ADMIN, PROJECTS, id))
  }, [navigate])

  const onDelete = useCallback(async (id: string) => {
    try {
      if (isLoading) return

      setIsDeleting(true)
      await dispatch(projectsAction.deleteProject(id)).unwrap()

      await dispatch(projectsAction.fetchProjects({ page: 1, pageSize: 10, language }))
    } finally {
      setIsDeleting(false)
    }
  }, [dispatch, language, isLoading])

  const onAddNew = useCallback(() => {
    navigate(pathJoin(ADMIN, PROJECTS, 'new'))
  }, [navigate])

  const onChangePage = useCallback((page: number, pageSize: number) => {
    if (isLoading) return

    dispatch(projectsAction.fetchProjects({ page, pageSize, language }))
  }, [dispatch, language, isLoading])

  const onChangeLanguage = useCallback((language: Language) => {
    if (isLoading) return

    setLanguage(language)
    const payload = { page: pagination?.page || 1, pageSize: pagination?.pageSize || 10, language }
    dispatch(projectsAction.fetchProjects(payload))
  }, [dispatch, isLoading, pagination])

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
    onChangePage,
    onChangeLanguage
  }
}

export default useProjectsManager
