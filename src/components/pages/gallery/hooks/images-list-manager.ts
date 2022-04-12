import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageView } from '../../../../api/types/image.types'
import { AppDispatch, State } from '../../../../store'
import { alertActions } from '../../../../store/slices/alert'
import { galleryActions } from '../../../../store/slices/gallery'
import { Pagination } from '../../../../types/common'

type UseImageListManager = () => {
  listImages: ImageView[]
  pagination: Pagination
  pullList: () => void
  isLoadingImages: boolean
  onChangePage: (page: number, pageSize: number) => void
}

const useImageListManager: UseImageListManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false)

  const listImages = useSelector((state: State) => state.gallery.images)
  const pagination = useSelector((state: State) => state.gallery.pagination)

  const pullList = useCallback(async (page = 1, pageSize = 25) => {
    try {
      setIsLoadingImages(true)
      await dispatch(galleryActions.fetchImages({ page, pageSize }))
    } catch (e: any) {
      if (e.message) dispatch(alertActions.pushMessage({ message: e.message, severity: 'error' }))
    } finally {
      setIsLoadingImages(false)
    }
  }, [dispatch])

  useEffect(() => {
    pullList()
    return () => {
      dispatch(galleryActions.clear())
    }
  }, [pullList, dispatch])

  const onChangePage = useCallback((page: number, pageSize: number) => {
    pullList(page, pageSize)
  }, [pullList])

  return {
    isLoadingImages,
    listImages,
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
      totalPages: pagination?.totalPages || 0
    },
    pullList,
    onChangePage
  }
}

export default useImageListManager
