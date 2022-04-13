import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { homePageActions } from '../../../../store/slices/homepage'
import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { ImageView } from '../../../../api/types/image.types'

type UseFormManager = () => {
  form: FormInstance
  loadingSave: boolean
  loadingPage: boolean
  onSave: () => void
}

const useFormManager: UseFormManager = () => {
  const [form] = useForm()
  const dispatch: AppDispatch = useDispatch()

  const state = useSelector((state: State) => state.homePage.data)
  const [loadingSave, setLoadingSave] = useState<boolean>(false)
  const [loadingPage, setLoadingPage] = useState<boolean>(false)

  const onSave = async () => {
    try {
      await form.validateFields()
      const fields = form.getFieldsValue(true)

      if (fields.avatars) {
        fields.avatars = fields.avatars.map((i: ImageView) => ({ type: 'main', imageId: i.id }))
      }

      setLoadingSave(true)
      await dispatch(homePageActions.updateHomePage(fields)).unwrap()
      setLoadingSave(false)

      setLoadingPage(true)
      await dispatch(homePageActions.fetchHomePage()).unwrap()
      setLoadingPage(false)

      dispatch(alertActions.pushMessage({ message: 'Home page updated', severity: 'success' }))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setLoadingPage(false)
      setLoadingSave(false)
    }
  }

  useEffect(() => {
    if (state) {
      form.setFields([
        {
          name: 'title',
          value: state.title
        },
        {
          name: 'subtitle',
          value: state.subtitle
        },
        {
          name: 'description',
          value: state.description
        },
        {
          name: 'avatars',
          value: state.avatars?.map(i => i.image)
        }
      ])
    }
  }, [state, form])

  useEffect(() => {
    (async () => {
      try {
        setLoadingPage(true)
        await dispatch(homePageActions.fetchHomePage()).unwrap()
      } catch (e: any) {
        if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
      } finally {
        setLoadingPage(false)
      }
    })()

    return () => {
      dispatch(homePageActions.clear())
    }
  }, [dispatch])

  return {
    form,
    loadingSave,
    loadingPage,
    onSave
  }
}

export default useFormManager
