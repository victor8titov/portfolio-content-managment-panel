import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button, Card, Modal } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons'

import { SocialMediaView } from '../../../api/types/social-media.types'
import { getUrlImageByTemplate } from '../../../utils/get-url-image'

type PropsCard = {
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
  socialMediaLink: SocialMediaView
  isDeleting: boolean
}

const SocialMediaCard: FC<PropsCard> = (props) => {
  const { socialMediaLink, onDelete, onUpdate, isDeleting } = props

  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const url = useMemo(() => getUrlImageByTemplate(socialMediaLink.icon), [socialMediaLink])

  const handleClickDelete = useCallback(() => {
    const handleOk = () => {
      setIsDeleted(true)
      onDelete(socialMediaLink.id)
    }
    Modal.confirm({ title: 'Are you sure you want to delete?', onOk: handleOk })
  }, [onDelete, socialMediaLink])

  const handleClickUpdate = useCallback(() => {
    onUpdate(socialMediaLink.id)
  }, [onUpdate, socialMediaLink])

  if (isDeleted) {
    return (
      <Card className='social-media-card'>
        <div className='social-media-card__body'>Deleting ...</div>
      </Card>
    )
  }

  return (
    <Card
      className='social-media-card'>
        <div className='social-media-card__body'>
          {url
            ? <img className='social-media-card__img' src={url} alt='icon link'/>
            : null
          }
          <Title level={5}>{socialMediaLink.name}</Title>
          <Text>{socialMediaLink.link}</Text>
        </div>
        <div className='social-media-card__controls'>
          <Button
            className='social-media-card__icon'
            shape='circle'
            icon={<EditOutlined />}
            onClick={handleClickUpdate} />
          <div className='social-media-card__icon'>
            { isDeleting
              ? <Button
                  disabled
                  shape='circle'
                  icon={<StopOutlined />} />
              : <Button
                  onClick={handleClickDelete}
                  icon={<DeleteOutlined />}
                  shape='circle' />
            }
          </div>
        </div>
    </Card>
  )
}

export default SocialMediaCard
