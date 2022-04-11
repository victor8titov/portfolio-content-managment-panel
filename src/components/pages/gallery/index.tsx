import React, { FC, useCallback, useMemo } from 'react'
import { Pagination, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'

import { ImageView } from '../../../api/types/image.types'
import ImageCard from '../../common/image-card'
import ImageLoader from '../../common/image-loader'
import useImageManager from './hooks/image-manager'
import useImageListManager from './hooks/images-list-manager'
import useManagerOfListOfSelected from './hooks/manager-of-list-of-selected'
import './style.scss'

type Props = {
  onSelect?: (files: ImageView[]) => void
  type?: 'default' | 'select-one' | 'multiselect'
}

const Gallery: FC<Props> = (props) => {
  const { type } = props
  const { isLoadingImages, listImages, pullList, pagination, onChangePage } = useImageListManager()
  const { onDelete } = useImageManager()
  const { onSelect, checkSelectedByImage } = useManagerOfListOfSelected(props.onSelect, type)

  const onDeleteImage = useCallback(async (image: ImageView) => {
    await onDelete(image)
    await pullList()
  }, [onDelete, pullList])
  const { page, pageSize, totalPages } = pagination

  const typeImageCard = useMemo(() => type === 'select-one' || type === 'multiselect' ? 'select' : 'default', [type])

  return (
    <div className='gallery-page'>
      <Title>Media files Gallery</Title>
      <Spin spinning={isLoadingImages}>
        <div className='gallery-page__body'>
          <Space align='center' wrap>
              <ImageLoader onLoaded={pullList}/>
              {listImages.map((image) =>
                <ImageCard image={image} key={image.id} onDelete={onDeleteImage} onSelect={onSelect} type={typeImageCard} selected={checkSelectedByImage(image)} />
              )}
          </Space>
          <div className='gallery-page__pagination'>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalPages * pageSize}
              onChange={onChangePage}
              hideOnSinglePage
              pageSizeOptions={[10, 20, 50]}
              />
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default Gallery
