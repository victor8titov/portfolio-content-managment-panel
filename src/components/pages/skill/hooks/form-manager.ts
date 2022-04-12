import { useForm } from 'antd/lib/form/Form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormInstance } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { skillsAction } from '../../../../store/slices/skills'
import { useParams } from 'react-router-dom'

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
      // eslint-disable-next-line
      const { name, level, group, description_en, description_ru } = form.getFieldsValue()

      const payload = {
        name,
        level,
        group: group.shift() || null,
        description: {
          en: description_en,
          ru: description_ru
        }
      }

      setIsLoading(true)
      if (mode === 'new') {
        await dispatch(skillsAction.createSkill(payload)).unwrap()
        await dispatch(alertActions.pushMessage({ message: 'Skill entity successfully created!', severity: 'success' }))
        form.resetFields()
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
          name: 'description_en',
          value: skill.description.en || ''
        },
        {
          name: 'description_ru',
          value: skill.description.ru || ''
        }
      ])
    }
  }, [skill, form])

  useEffect(() => {
    return () => {
      dispatch(skillsAction.clear())
    }
  }, [dispatch])

  useEffect(() => {
    if (!groups.length) {
      dispatch(skillsAction.fetchSkills())
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
