import React, { FC, useCallback, useState } from 'react'
import { Modal } from 'antd'

import { ImageView } from '../../../api/types/image.types'
import Gallery from '../../pages/gallery'

type Props = {
  onSelect: (file: ImageView[]) => void
  type: 'select-one' | 'multiselect'
  isOpen: boolean
};

const MediaFileSelection: FC<Props> = (props) => {
  const { type, isOpen, onSelect } = props
  const [files, setFiles] = useState<ImageView[]>([])

  const handleOk = useCallback(() => {
    onSelect(files)
  }, [onSelect, files])

  const handleCancel = useCallback(() => {
    onSelect(files)
  }, [onSelect, files])

  const handleSelect = useCallback((files: ImageView[]) => {
    setFiles(files)
  }, [])

  return (
    <Modal
      visible={isOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Gallery type={type} onSelect={handleSelect} />
    </Modal>
  )
}

export default MediaFileSelection
