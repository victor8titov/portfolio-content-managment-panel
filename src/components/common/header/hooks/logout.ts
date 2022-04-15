import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../../../../store'
import { profileActions } from '../../../../store/slices/profile'

type UseLogout = () => {
  onLogout: () => void
}

const useLogout: UseLogout = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: State) => state.profile.user)

  const onLogout = useCallback(() => {
    if (user?.name) dispatch(profileActions.fetchLogout({ username: user.name }))
  }, [dispatch, user])

  return {
    onLogout
  }
}

export default useLogout
