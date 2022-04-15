import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, State } from '../../../../store'
import { profileActions } from '../../../../store/slices/profile'

type UseLogin = () => {
  onLogin: (fields: { username: string, password: string }) => void
  isLoading: boolean
}

const useLogin: UseLogin = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isLoggedIn = useSelector((state: State) => state.profile.isLoggedIn)
  const authenticationCheckStatus = useSelector((state: State) => state.profile.authenticationCheckStatus)

  useEffect(() => {
    if (isLoggedIn) return

    dispatch(profileActions.authenticationCheckStatus())
  }, [dispatch, isLoggedIn, authenticationCheckStatus])

  useEffect(() => {
    if (isLoggedIn) navigate('/admin/homepage')
  }, [isLoggedIn, navigate])

  const onLogin = useCallback(async (fields) => {
    setIsLoading(true)
    await dispatch(profileActions.fetchLogin(fields))
    setIsLoading(false)
  }, [dispatch])

  return {
    onLogin,
    isLoading
  }
}

export default useLogin
