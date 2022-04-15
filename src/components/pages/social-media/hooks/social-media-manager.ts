import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SocialMediaView } from '../../../../api/types/social-media.types'
import { ADMIN, pathJoin, SOCIAL_MEDIA } from '../../../../constants/routes'

import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { socialMediaAction } from '../../../../store/slices/social-media'

type UseSocialMediaManager = () => {
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onAddNew: () => void
  socialMedia: SocialMediaView[]
  isLoading: boolean
  isDeleting: boolean
}

const useSocialMediaManager: UseSocialMediaManager = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const socialMedia = useSelector((state: State) => state.socialMedia.socialMedia)

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
    getSocialMediaList()
    return () => {
      dispatch(socialMediaAction.clear())
    }
  }, [dispatch, getSocialMediaList])

  const onUpdate = useCallback((id: string) => {
    navigate(pathJoin(ADMIN, SOCIAL_MEDIA, id))
  }, [navigate])

  const onDelete = useCallback(async (id: string) => {
    try {
      setIsDeleting(true)
      await dispatch(socialMediaAction.deleteSocialMedia(id))

      setIsLoading(true)
      await dispatch(socialMediaAction.fetchSocialMedia())
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }, [dispatch])

  const onAddNew = useCallback(() => {
    navigate(pathJoin(ADMIN, SOCIAL_MEDIA, 'new'))
  }, [navigate])

  return {
    socialMedia,
    onUpdate,
    onDelete,
    onAddNew,
    isLoading,
    isDeleting
  }
}

export default useSocialMediaManager
