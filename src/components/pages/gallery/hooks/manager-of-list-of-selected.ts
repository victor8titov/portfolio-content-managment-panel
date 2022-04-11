import { useCallback, useEffect, useState } from 'react'
import { ImageView } from '../../../../api/types/image.types'

type UseManagerOfListOfSelected = (
  onChangeFilesList?: (files: ImageView[]) => void,
  type?: 'default' | 'select-one' | 'multiselect'
) => {
  onSelect: (image: ImageView) => void
  checkSelectedByImage: (image: ImageView) => boolean
}

const useManagerOfListOfSelected: UseManagerOfListOfSelected = (onChangeFilesList, type) => {
  const [listSelectedImages, setListSelectedImages] = useState<ImageView[]>([])

  useEffect(() => {
    if (onChangeFilesList) onChangeFilesList(listSelectedImages)
  }, [listSelectedImages, onChangeFilesList])

  const onSelect = useCallback((image: ImageView) => {
    if (type === 'default') return

    if (type === 'select-one') {
      setListSelectedImages([image])
    }

    if (type === 'multiselect') {
      if (listSelectedImages.some(i => i.id === image.id)) {
        const filtered = listSelectedImages.filter(i => i.id !== image.id)
        setListSelectedImages(filtered)
      } else {
        setListSelectedImages(state => ([...state, image]))
      }
    }
  }, [type, listSelectedImages])

  const checkSelectedByImage = useCallback((image: ImageView) => {
    return listSelectedImages.some(i => i.id === image.id)
  }, [listSelectedImages])

  return {
    onSelect,
    checkSelectedByImage
  }
}

export default useManagerOfListOfSelected
