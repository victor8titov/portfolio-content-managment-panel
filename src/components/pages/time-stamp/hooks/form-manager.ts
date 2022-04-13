import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useForm } from 'antd/lib/form/Form'
import { FormInstance } from 'antd'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { timeStampsAction } from '../../../../store/slices/time-stamps'
import { TimeStampCreation } from '../../../../api/types/time-stamp.types'

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
  const timeStamp = useSelector((state: State) => state.timeStamps.timeStamp)
  const { timeStampId } = useParams()
  const mode: 'new' | 'update' = useMemo(() => timeStampId === 'new' ? 'new' : 'update', [timeStampId])

  const onSave = async () => {
    try {
      await form.validateFields()
      console.log(form.getFieldsValue())
      const { name, link, description, start, end } = form.getFieldsValue()

      const payload: TimeStampCreation = {
        name,
        link,
        description,
        events: [
          {
            status: 'start',
            date: start
          },
          {
            status: 'end',
            date: end
          }
        ]
      }
      setIsLoading(true)
      if (mode === 'new') {
        await dispatch(timeStampsAction.createTimeStamp(payload)).unwrap()
        await dispatch(alertActions.pushMessage({ message: 'Skill entity successfully created!', severity: 'success' }))
        form.resetFields()
      }

      if (mode === 'update' && timeStampId) {
        await dispatch(timeStampsAction.updateTimeStamp({ id: timeStampId, ...payload })).unwrap()
        await dispatch(alertActions.pushMessage({ message: `Time Stamp ${timeStampId} successfully update!`, severity: 'success' }))
        await dispatch(timeStampsAction.fetchTimeStampById(timeStampId)).unwrap()
      }
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }

  const getTimeStamp = useCallback(async (timeStampId: string) => {
    try {
      setIsLoading(true)
      await dispatch(timeStampsAction.fetchTimeStampById(timeStampId)).unwrap()
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (timeStampId && timeStampId !== 'new') {
      getTimeStamp(timeStampId)
    }
  }, [getTimeStamp, timeStampId])

  useEffect(() => {
    if (timeStamp) {
      form.setFields([
        {
          name: 'name',
          value: timeStamp.name
        },
        {
          name: 'link',
          value: timeStamp.link
        },
        {
          name: 'start',
          value: moment(timeStamp.events.find(i => i.status === 'start')?.date || '')
        },
        {
          name: 'end',
          value: moment(timeStamp.events.find(i => i.status === 'end')?.date || '')
        },
        {
          name: 'description',
          value: timeStamp.description
        }
      ])
    }
  }, [timeStamp, form])

  useEffect(() => {
    return () => {
      dispatch(timeStampsAction.clear())
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
