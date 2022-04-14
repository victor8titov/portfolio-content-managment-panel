import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import './styles.scss'
import useFormManager from './hooks/form-manager'
import SocialMediaLinkForm from './form'

const { useBreakpoint } = Grid

const SocialMediaLink: FC = () => {
  const { form, onSave, isLoading, mode } = useFormManager()

  const screens = useBreakpoint()
  const isDesktop = useMemo(() => screens.md, [screens])

  const GoBack: FC = () => {
    return (
      <Button loading={isLoading}>
        <Link to='/admin/social-media'>{isDesktop ? 'Go to Social Media ' : ''}  <RollbackOutlined /></Link>
      </Button>
    )
  }

  return (
    <div className='social-media-link'>
      <div className='social-media-link__title'>
        <Title>Social Media Link</Title>
        <GoBack />
      </div>

      <Spin spinning={isLoading}>
        <SocialMediaLinkForm form={form} />
      </Spin>

      <Space >
        <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
        <GoBack />
      </Space>
    </div>
  )
}

export default SocialMediaLink
