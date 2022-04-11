import { FormInstance } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageView } from '../../../../api/types/image.types'
import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { uploadAction } from '../../../../store/slices/uploads'

type UseFormManager = (callbackAfterSuccessfulSaving?: (image: ImageView) => void) => {
  form: FormInstance
  isUploading: boolean
  onSave: () => void
}

const useFormManager: UseFormManager = (callbackAfterSuccessfulSaving) => {
  const [form] = useForm()
  const dispatch: AppDispatch = useDispatch()

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const image = useSelector((state: State) => state.upload.image)

  const onSave = async () => {
    try {
      await form.validateFields()

      const { name, description, ...rest } = form.getFieldsValue()
      const file = rest.file.fileList[0]

      const formData = new FormData()

      if (name) formData.append('name', name)
      formData.append('description', description || '')
      formData.append('file', file.originFileObj)

      setIsUploading(true)
      await dispatch(uploadAction.uploadImage(formData))

      form.resetFields()
      dispatch(alertActions.pushMessage({ message: 'Media file successfully added', severity: 'success' }))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (image) {
      if (callbackAfterSuccessfulSaving) callbackAfterSuccessfulSaving(image)
      dispatch(uploadAction.clear())
    }
  }, [image, dispatch, callbackAfterSuccessfulSaving])

  return {
    isUploading,
    onSave,
    form
  }
}

export default useFormManager
