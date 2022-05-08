import { useForm } from 'antd/lib/form/Form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormInstance } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { useParams } from 'react-router-dom'
import { socialMediaAction } from '../../../../store/slices/social-media'

type UseFormManager = () => {
  form: FormInstance
  onSave: () => void
  isLoading: boolean
  mode: 'new' | 'update'
}

const useFormManager: UseFormManager = () => {
  const [form] = useForm()
  const { socialMediaId } = useParams()
  const dispatch: AppDispatch = useDispatch()

  const mode: 'new' | 'update' = useMemo(() => socialMediaId === 'new' ? 'new' : 'update', [socialMediaId])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const socialMedia = useSelector((state: State) => state.socialMedia.socialMedia)

  const onSave = async () => {
    try {
      await form.validateFields()
      const { name, link, icon } = form.getFieldsValue()

      const payload = {
        name,
        link,
        imageId: icon?.shift()?.id || null
      }

      setIsLoading(true)
      if (mode === 'new') {
        await dispatch(socialMediaAction.createSocialMedia(payload)).unwrap()
        await dispatch(alertActions.pushMessage({ message: 'Skill entity successfully created!', severity: 'success' }))
        form.resetFields()
      }

      if (mode === 'update' && socialMediaId) {
        await dispatch(socialMediaAction.updateSocialMedia({ id: socialMediaId, ...payload })).unwrap()
        await dispatch(alertActions.pushMessage({ message: `Social Media link ${socialMediaId} successfully update!`, severity: 'success' }))
        await dispatch(socialMediaAction.fetchSocialMedia()).unwrap()
      }
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }

  const getSocialMediaList = useCallback(async () => {
    try {
      setIsLoading(true)
      await dispatch(socialMediaAction.fetchSocialMedia())
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (!socialMedia.length && socialMediaId && socialMediaId !== 'new') {
      getSocialMediaList()
    }
  }, [getSocialMediaList, socialMediaId, socialMedia])

  useEffect(() => {
    if (socialMedia) {
      const link = socialMedia.find(i => i.id.toString() === socialMediaId?.toString())
      if (!link) return

      form.setFields([
        {
          name: 'name',
          value: link.name
        },
        {
          name: 'link',
          value: link.link
        },
        {
          name: 'icon',
          value: link.icon ? [link.icon] : null
        }
      ])
      form.validateFields()
    }
  }, [socialMedia, form, socialMediaId])

  useEffect(() => {
    return () => {
      dispatch(socialMediaAction.clear())
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
