import React, { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { State } from '../../store'
import { profileActions } from '../../store/slices/profile'

const Authentication: FC = (): ReactElement | null => {
  const isLoggedIn = useSelector((state: State) => state.profile.isLoggedIn)
  const authenticationCheckStatus = useSelector((state: State) => state.profile.authenticationCheckStatus)
  const user = useSelector((state: State) => state.profile.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) return

    if (authenticationCheckStatus === 'failure') {
      navigate('/login')
      return
    }

    dispatch(profileActions.authenticationCheckStatus())
  }, [dispatch, navigate, user, isLoggedIn, authenticationCheckStatus])

  useEffect(() => {
    return () => {
      dispatch(profileActions.clearProfile())
    }
  }, [dispatch])

  useEffect(() => {
    if (!user && isLoggedIn) {
      dispatch(profileActions.fetchUser())
    }
  }, [user, isLoggedIn, authenticationCheckStatus, dispatch])

  return <Outlet />
}

export default Authentication
