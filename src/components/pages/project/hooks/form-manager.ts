import { useEffect, useMemo } from 'react'
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
import { decodeStringInObjectWithLanguage } from '../../../../utils/decode-string'

type UseFormManager = () => {
  form: FormInstance
  onSave: () => void
  isLoading: boolean
  mode: 'new' | 'update'
}

const useFormManager: UseFormManager = () => {
  const [form] = useForm()
  const dispatch: AppDispatch = useDispatch()

  const { projectId } = useParams()
  const mode: 'new' | 'update' = useMemo(() => projectId === 'new' ? 'new' : 'update', [projectId])
  const isLoading = useSelector((state: State) => state.projects.isLoading)
  const project = useSelector((state: State) => state.projects.project)
  console.log('--------------', project);
  const onSave = async () => {
    await form.validateFields()

    const {
      name,
      type = null,
      spendTime = null,
      stack = [],
      images = [],
      events = [],
      description = null,
      ...rest
    } = form.getFieldsValue()

    const links =
        rest?.links?.map((i: { name: string, link: string, icon: ImageView }) =>
          ({ name: i.name, link: i.link })) || []

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
    if (mode === 'new') {
      await dispatch(projectsAction.createProject(payload)).unwrap()
      await dispatch(alertActions.pushMessage({ message: 'Project entity successfully created!', severity: 'success' }))
      form.resetFields()
    }

    if (mode === 'update' && projectId) {
      await dispatch(projectsAction.updateProject({ id: projectId, ...payload })).unwrap()
      await dispatch(alertActions.pushMessage({ message: `Project ${projectId} successfully update!`, severity: 'success' }))
      await dispatch(projectsAction.fetchProjectById(projectId)).unwrap()
    }
  }

  useEffect(() => {
    if (projectId && projectId !== 'new') {
      dispatch(projectsAction.fetchProjectById(projectId))
    }
  }, [projectId, dispatch])

  useEffect(() => {
    if (project) {
      form.setFields([
        {
          name: 'name',
          value: project.name || ''
        },
        {
          name: 'type',
          value: project.type || ''
        },
        {
          name: 'spendTime',
          value: project.spendTime || ''
        },
        {
          name: 'stack',
          value: project.stack || []
        },
        {
          name: 'events',
          value: project?.events?.map(i => ({ ...i, date: moment(i.date) })) || []
        },
        {
          name: 'images',
          value: project.images || []
        },
        {
          name: 'links',
          value: project.links || []
        },
        {
          name: 'description',
          value: decodeStringInObjectWithLanguage(project.description)
        }
      ])
      form.validateFields()
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
