import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { SkillView } from '../../../../api/types/skills.types'
import { skillsAction } from '../../../../store/slices/skills'

type UseSkillsManager = () => {
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onAddNew: () => void
  skills: SkillView[]
  groups: string[]
  isLoading: boolean
  isDeleting: boolean
}

const useSkillsManager: UseSkillsManager = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const skills = useSelector((state: State) => state.skills.skills)
  const groups = useSelector((state: State) => state.skills.groups)

  const getSkills = useCallback(async () => {
    try {
      setIsLoading(true)
      await dispatch(skillsAction.fetchSkills())
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    getSkills()
    return () => {
      dispatch(skillsAction.clear())
    }
  }, [dispatch, getSkills])

  const onUpdate = useCallback((id: string) => {
    navigate(`/skills/${id}`)
  }, [navigate])

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsDeleting(true)
      await dispatch(skillsAction.deleteSkill(id))

      setIsLoading(true)
      await dispatch(skillsAction.fetchSkills())
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }, [dispatch])

  const onAddNew = useCallback(() => {
    navigate('/skills/new')
  }, [navigate])

  return {
    skills,
    groups,
    onUpdate,
    onDelete,
    onAddNew,
    isLoading,
    isDeleting
  }
}

export default useSkillsManager
