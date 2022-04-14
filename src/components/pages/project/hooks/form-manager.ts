import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useForm } from 'antd/lib/form/Form'
import { FormInstance } from 'antd'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { ProjectCreation } from '../../../../api/types/projects'
import { projectsAction } from '../../../../store/slices/projects'
import { ImageView } from '../../../../api/types/image.types'

type UseFormManager = () => {
  form: FormInstance
  onSave: () => void
  isLoading: boolean
  mode: 'new' | 'update'
}

const useFormManager: UseFormManager = () => {
  const [form] = useForm()
  const dispatch: AppDispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const project = useSelector((state: State) => state.projects.project)
  const { projectId } = useParams()
  const mode: 'new' | 'update' = useMemo(() => projectId === 'new' ? 'new' : 'update', [projectId])

  const onSave = async () => {
    try {
      await form.validateFields()
      console.log(form.getFieldsValue())
      const { name, type, spendTime, stack, images, events, description, ...rest } = form.getFieldsValue()

      const links =
        rest.links.map((i: { name: string, link: string, icon: ImageView }) =>
          ({ name: i.name, link: i.link }))
      const payload: ProjectCreation = {
        name,
        type,
        stack,
        spendTime,
        description,
        links,
        imagesId: images.map((i: ImageView) => i.id.toString()),
        events
      }

      setIsLoading(true)
      if (mode === 'new') {
        await dispatch(projectsAction.createProject(payload)).unwrap()
        await dispatch(alertActions.pushMessage({ message: 'Skill entity successfully created!', severity: 'success' }))
        form.resetFields()
      }

      if (mode === 'update' && projectId) {
        await dispatch(projectsAction.updateProject({ id: projectId, ...payload })).unwrap()
        await dispatch(alertActions.pushMessage({ message: `Project ${projectId} successfully update!`, severity: 'success' }))
        await dispatch(projectsAction.fetchProjectById(projectId)).unwrap()
      }
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }

  const getProject = useCallback(async (projectId: string) => {
    try {
      setIsLoading(true)
      await dispatch(projectsAction.fetchProjectById(projectId)).unwrap()
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (projectId && projectId !== 'new') {
      getProject(projectId)
    }
  }, [getProject, projectId])

  useEffect(() => {
    if (project) {
      form.setFields([
        {
          name: 'name',
          value: project.name
        },
        {
          name: 'type',
          value: project.type
        },
        {
          name: 'spendTime',
          value: project.spendTime
        },
        {
          name: 'stack',
          value: project.stack
        },
        {
          name: 'events',
          value: project.events.map(i => ({ ...i, date: moment(i.date) }))
        },
        {
          name: 'type',
          value: project.type
        },
        {
          name: 'images',
          value: project.images
        },
        {
          name: 'links',
          value: project.links
        },
        {
          name: 'description',
          value: project.description
        }
      ])
    }
  }, [project, form])

  useEffect(() => {
    return () => {
      dispatch(projectsAction.clear())
    }
  }, [dispatch])

  return {
    form,
    onSave,
    isLoading,
    mode
  }
}

export default useFormManager
