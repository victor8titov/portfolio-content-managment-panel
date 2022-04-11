import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ImageView } from '../../../../api/types/image.types'
import { AppDispatch } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { galleryActions } from '../../../../store/slices/gallery'

type UseImageManager = () => {
  isLoading: boolean
  onDelete: (image: ImageView) => void
}

const useImageManager: UseImageManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDelete = useCallback(async (image: ImageView) => {
    try {
      setIsLoading(true)
      await dispatch(galleryActions.deleteImage(image.id))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  return {
    isLoading,
    onDelete
  }
}

export default useImageManager
