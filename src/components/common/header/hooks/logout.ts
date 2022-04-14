import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../../../../store'
import { profileActions } from '../../../../store/slices/profile'

type UseLogout = () => {
  logout: () => void
}

const useLogout: UseLogout = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: State) => state.profile.user)

  const logout = useCallback(() => {
    console.log('rung logout');
    // if (user?.name) dispatch(profileActions.fetchLogout({ username: user?.name }))
  }, [])

  return {
    logout
  }
}

export default useLogout
