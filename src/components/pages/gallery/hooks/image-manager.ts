import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ImageView } from '../../../../api/types/image.types'
import { AppDispatch } from '../../../../store'
import { galleryActions } from '../../../../store/slices/gallery'

type UseImageManager = () => {
  onDelete: (image: ImageView) => void
}

const useImageManager: UseImageManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const onDelete = useCallback(async (image: ImageView) => {
    await dispatch(galleryActions.deleteImage(image.id)).unwrap()
  }, [dispatch])

  return {
    onDelete
  }
}

export default useImageManager
