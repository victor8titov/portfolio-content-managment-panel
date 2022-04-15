import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageView } from '../../../../api/types/image.types'
import { AppDispatch, State } from '../../../../store'
import { galleryActions } from '../../../../store/slices/gallery'
import { Pagination } from '../../../../types/common'

type UseImageListManager = () => {
  listImages: ImageView[]
  pagination: Pagination
  getListImages: (page?: number, pageSize?: number) => void
  isLoading: boolean
}

const useImageListManager: UseImageListManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const isLoading = useSelector((state: State) => state.gallery.isLoading)
  const listImages = useSelector((state: State) => state.gallery.images)
  const pagination = useSelector((state: State) => state.gallery.pagination)
  const isRotten = useSelector((state: State) => state.gallery.isRotten)

  const getListImages = useCallback((page?: number, pageSize?: number) => {
    dispatch(galleryActions.fetchImages({ page, pageSize }))
  }, [dispatch])

  useEffect(() => {
    if (isRotten && !isLoading) {
      dispatch(galleryActions.fetchImages())
    }
  }, [dispatch, isRotten, isLoading])

  return {
    isLoading,
    listImages,
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
      totalPages: pagination?.totalPages || 0
    },
    getListImages
  }
}

export default useImageListManager
