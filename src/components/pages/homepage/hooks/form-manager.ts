import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { homePageActions } from '../../../../store/slices/homepage'
import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { HomePageCreation } from '../../../../api/types/homepage.types'
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

  const prepareToSend = (fields: any): HomePageCreation => {
    const languages = ['ru', 'en']
    const fieldsName = ['title', 'subtitle', 'description']

    const prepared: any = {}
    const _fields = Object.entries(fields)

    fieldsName.forEach((_name) => {
      const filtered = _fields.filter(i => i[0].indexOf(_name) === 0 && i[1])
      if (filtered.length) {
        languages.forEach((_language) => {
          const _value = filtered.filter(i => i[0].includes(_language)).shift()
          if (_value) {
            if (!prepared[_name]) prepared[_name] = {}
            prepared[_name][_language] = _value[1]
          }
        })
      }
    })

    if (fields.avatars) {
      prepared.avatars = fields.avatars.map((i: ImageView) => ({ type: 'main', imageId: i.id }))
    }

    return prepared
  }

  const onSave = async () => {
    try {
      await form.validateFields()
      const fields = form.getFieldsValue(true)

      setLoadingSave(true)
      await dispatch(homePageActions.updateHomePage(prepareToSend(fields))).unwrap()
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
          name: 'title_en',
          value: state.title?.en
        },
        {
          name: 'title_ru',
          value: state.title?.ru
        },
        {
          name: 'subtitle_en',
          value: state.subtitle?.en
        },
        {
          name: 'subtitle_ru',
          value: state.subtitle?.ru
        },
        {
          name: 'description_en',
          value: state.description?.en
        },
        {
          name: 'description_ru',
          value: state.description?.ru
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
