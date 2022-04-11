import React, { FC, useCallback, useState } from 'react'
import { Card, Image } from 'antd'
import { PlusOutlined, CloseCircleOutlined, RedoOutlined } from '@ant-design/icons'

import { ImageView } from '../../../../api/types/image.types'
import { getUrlImageByTemplate } from '../../../../utils/get-url-image'
import MediaFileSelections from '../../media-file-selection'
import './styles.scss'

type Props = {
  value?: ImageView[]
  onChange?: (files: ImageView[]) => void
  type?: 'select-one' | 'multiselect'
}

const ChooseMediaFiles: FC<Props> = (props) => {
  const { value = [], onChange, type = 'multiselect' } = props
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  const handleSelect = useCallback((files: ImageView[]) => {
    if (onChange) onChange(files)
    setVisibleModal(false)
  }, [onChange])

  const handleClickAddImage = useCallback(() => {
    setVisibleModal(true)
  }, [])

  const handleClickRemove = useCallback((id: string) => () => {
    const filtered = value.filter(i => i.id !== id)
    if (onChange) onChange(filtered)
  }, [onChange, value])

  const handleClickChange = useCallback((id: string) => () => {
    const filtered = value.filter(i => i.id !== id)
    if (onChange) onChange(filtered)
    setVisibleModal(true)
  }, [value, onChange])

  const EmptyBox: FC<{onClick: () => void}> = ({ onClick }) => (
    <div className="choose-media-files__empty-box" onClick={onClick}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Add media file</div>
    </div>)

  return (
    <div className="choose-media-files">
      {value.length
        ? <>
            { value.map((file) => (
              <Card
                className='choose-media-files__card'
                key={file.id}
                actions={[
                  <RedoOutlined key="change" onClick={handleClickChange(file.id)}/>,
                  <CloseCircleOutlined key="remove" onClick={handleClickRemove(file.id)}/>
                ]}>
                <Image src={getUrlImageByTemplate(file, 'mid')} className='choose-media-files__image'/>
              </Card>))
            }
            {type === 'multiselect' ? <EmptyBox onClick={handleClickAddImage} /> : null}
          </>

        : <EmptyBox onClick={handleClickAddImage} />
      }
      <MediaFileSelections onSelect={handleSelect} type={type} isOpen={visibleModal} />
    </div>
  )
}

export default ChooseMediaFiles
