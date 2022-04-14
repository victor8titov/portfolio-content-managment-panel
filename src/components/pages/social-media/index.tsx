import React, { FC } from 'react'
import { Affix, Button, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'

import useSocialMediaManager from './hooks/social-media-manager'
import SocialMediaCard from './social-media-card'
import './styles.scss'

const SocialMedia: FC = () => {
  const { socialMedia, isLoading, onUpdate, onDelete, isDeleting, onAddNew } = useSocialMediaManager()

  return (
    <div className='social-media'>
      <Title>Social Media Links</Title>
      <Text>Here you can manage links where you can be found or contact you</Text>

      <div className='social-media__add-box'>
        <Affix offsetTop={10}>
          <Button type='primary' onClick={onAddNew}>
            Add new Social Link
          </Button>
        </Affix>
      </div>

      <Spin spinning={isLoading}>
        <div className='social-media__body'>
          {socialMedia.map(item => (
            <SocialMediaCard key={item.id} socialMediaLink={item} onDelete={onDelete} onUpdate={onUpdate} isDeleting={isDeleting} />))
          }
        </div>
      </Spin>
    </div>
  )
}

export default SocialMedia
