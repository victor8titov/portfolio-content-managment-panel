import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { SkillView } from '../../../../api/types/skills.types'
import { skillsAction } from '../../../../store/slices/skills'
import { Language } from '../../../../types/common'
import { ADMIN, pathJoin, SKILLS } from '../../../../constants/routes'

type UseSkillsManager = (language?: Language) => {
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onAddNew: () => void
  skills: SkillView[]
  groups: string[]
  isLoading: boolean
  isDeleting: boolean
}

const useSkillsManager: UseSkillsManager = (language = Language.EN) => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const skills = useSelector((state: State) => state.skills.skills)
  const groups = useSelector((state: State) => state.skills.groups)

  const getSkills = useCallback(async (language) => {
    try {
      setIsLoading(true)
      await dispatch(skillsAction.fetchSkills(language))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    getSkills(language)
    return () => {
      dispatch(skillsAction.clear())
    }
  }, [dispatch, getSkills, language])

  const onUpdate = useCallback((id: string) => {
    navigate(pathJoin(ADMIN, SKILLS, id))
  }, [navigate])

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsDeleting(true)
      await dispatch(skillsAction.deleteSkill(id))

      setIsLoading(true)
      await dispatch(skillsAction.fetchSkills(language))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }, [dispatch, language])

  const onAddNew = useCallback(() => {
    navigate(pathJoin(ADMIN, SKILLS, 'new'))
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
