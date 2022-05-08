import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormInstance } from 'antd'
import { useForm } from 'antd/lib/form/Form'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { skillsAction } from '../../../../store/slices/skills'
import { Language } from '../../../../types/common'
import { decodeStringInObjectWithLanguage } from '../../../../utils/decode-string'

type UseFormManager = () => {
  form: FormInstance
  onSave: () => void
  groups: string[]
  isLoading: boolean
  mode: 'new' | 'update'
}

const useFormManager: UseFormManager = () => {
  const [form] = useForm()
  const { skillId } = useParams()
  const dispatch: AppDispatch = useDispatch()

  const mode: 'new' | 'update' = useMemo(() => skillId === 'new' ? 'new' : 'update', [skillId])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const groups = useSelector((state: State) => state.skills.groups)
  const skill = useSelector((state: State) => state.skills.skill)

  const onSave = async () => {
    try {
      await form.validateFields()
      const { name, level, group, description } = form.getFieldsValue()

      const payload = {
        name,
        level,
        group: group.shift() || null,
        description
      }

      setIsLoading(true)
      if (mode === 'new') {
        await dispatch(skillsAction.createSkill(payload)).unwrap()
        await dispatch(alertActions.pushMessage({ message: 'Skill entity successfully created!', severity: 'success' }))
        form.resetFields()
        await dispatch(skillsAction.fetchSkills(Language.EN))
      }

      if (mode === 'update' && skillId) {
        await dispatch(skillsAction.updateSkill({ id: skillId, ...payload })).unwrap()
        await dispatch(alertActions.pushMessage({ message: `Skill ${skillId} successfully update!`, severity: 'success' }))
        await dispatch(skillsAction.fetchSkillById(skillId)).unwrap()
      }
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }

  const getSkill = useCallback(async (skillId: string) => {
    try {
      setIsLoading(true)
      await dispatch(skillsAction.fetchSkillById(skillId)).unwrap()
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (skillId && skillId !== 'new') {
      getSkill(skillId)
    }
  }, [getSkill, skillId])

  useEffect(() => {
    if (skill) {
      form.setFields([
        {
          name: 'name',
          value: skill.name
        },
        {
          name: 'level',
          value: skill.level
        },
        {
          name: 'group',
          value: skill.group ? [skill.group] : []
        },
        {
          name: 'description',
          value: decodeStringInObjectWithLanguage(skill.description)
        }
      ])
      form.validateFields()
    }
  }, [skill, form])

  useEffect(() => {
    return () => {
      dispatch(skillsAction.clear())
    }
  }, [dispatch])

  useEffect(() => {
    if (!groups.length) {
      dispatch(skillsAction.fetchSkills(Language.EN))
    }
    // eslint-disable-next-line
  }, [])

  return {
    form,
    onSave,
    groups,
    isLoading,
    mode
  }
}

export default useFormManager
