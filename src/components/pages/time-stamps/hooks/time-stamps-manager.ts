import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { Language } from '../../../../types/common'
import { TimeStampView } from '../../../../api/types/time-stamp.types'
import { timeStampsAction } from '../../../../store/slices/time-stamps'

type UseTimeStampsManager = (language?: Language) => {
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onAddNew: () => void
  timeStamps: TimeStampView[]
  isLoading: boolean
  isDeleting: boolean
}

const useTimeStampsManager: UseTimeStampsManager = (language = Language.EN) => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const timeStamps = useSelector((state: State) => state.timeStamps.timeStamps)

  const getTimeStamps = useCallback(async (language) => {
    try {
      setIsLoading(true)
      await dispatch(timeStampsAction.fetchTimeStamps(language))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    getTimeStamps(language)
    return () => {
      dispatch(timeStampsAction.clear())
    }
  }, [dispatch, getTimeStamps, language])

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsDeleting(true)
      await dispatch(timeStampsAction.deleteTimeStamp(id))

      setIsLoading(true)
      await dispatch(timeStampsAction.fetchTimeStamps(language))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }, [dispatch, language])

  const onAddNew = useCallback(() => {
    navigate('/time-stamps/new')
  }, [navigate])

  const onUpdate = useCallback((id: string) => {
    navigate(`/time-stamps/${id}`)
  }, [navigate])

  return {
    timeStamps,
    onUpdate,
    onDelete,
    onAddNew,
    isLoading,
    isDeleting
  }
}

export default useTimeStampsManager
