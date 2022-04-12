import { Badge, Button, Empty, Image, Modal } from 'antd'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { FileImageOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'

import { getUrlImageByTemplate } from '../../../utils/get-url-image'
import { FALLBACK } from './constants'
import { ImageView } from '../../../api/types/image.types'
import './styles.scss'

type Props = {
  image: ImageView;
  onDelete?: (image: ImageView) => void;
  onSelect?: (image: ImageView) => void;
  type?: 'select' | 'default';
  selected?: boolean
};

const ImageCard: FC<Props> = (props) => {
  const { onDelete, image, type, onSelect, selected } = props
  const [isVisiblePreview, setIsVisiblePreview] = useState<boolean>(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const urlOriginal = useMemo(() => getUrlImageByTemplate(image, 'original'), [image])
  const urlMiddle = useMemo(() => getUrlImageByTemplate(image, 'mid'), [image])

  const handleClickDelete = useCallback((event) => {
    event.stopPropagation()

    const handleOk = () => {
      if (onDelete) onDelete(image)
      if (type === 'select' && onSelect) onSelect(image)
      setIsDeleted(true)
    }

    Modal.confirm({ title: 'Delete media?', onOk: handleOk })
  }, [onDelete, image, type, onSelect])

  const handleClickView = useCallback((event) => {
    event.stopPropagation()
    setIsVisiblePreview(true)
  }, [])

  const handleVisibleChange = useCallback((visible) => {
    if (!visible) setIsVisiblePreview(visible)
  }, [])

  const handleClickToMask = useCallback(() => {
    if (type === 'select' && onSelect) onSelect(image)
  }, [onSelect, image, type])

  const Mask = useCallback(() => {
    return (
      <div className="image-card__mask" onClick={handleClickToMask}>
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleClickDelete}/>
        <Button shape="circle" icon={<EyeOutlined />} onClick={handleClickView}/>
      </div>
    )
  }, [handleClickDelete, handleClickToMask, handleClickView])

  const classesForRoot = useMemo(() => {
    const classes: string[] = ['image-card']
    if (type === 'select') classes.push('image-card_type-select')
    if (selected) classes.push('image-card_selected')

    return classes.join(' ')
  }, [selected, type])

  if (isDeleted) return <Empty className='image-card' image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />

  return (
    <Badge status="processing" dot={selected} style={{ position: 'absolute' }} >
      <div className={classesForRoot}>
        {urlMiddle
          ? <Image
              className="image-card__image"
              src={urlMiddle}
              preview={{ src: urlOriginal, mask: <Mask />, visible: isVisiblePreview, onVisibleChange: handleVisibleChange }}
              alt={image.description || 'image for portfolio'}
              fallback={FALLBACK}
            />
          : <FileImageOutlined />
        }
      </div>
    </Badge>
  )
}

export default ImageCard
