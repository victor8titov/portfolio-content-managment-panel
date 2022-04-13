import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import useFormManager from './hooks/form-manager'
import ProjectForm from './form'
import './styles.scss'

const Project: FC = () => {
  const { form, onSave, isLoading, mode } = useFormManager()
  return (
    <div className='project'>
      <div className='project__title'>
        <Title>Project</Title>
        <Button>
          <Link to='/projects'>Go to Projects<RollbackOutlined /></Link>
        </Button>
      </div>

      <Spin spinning={isLoading}>
        <ProjectForm form={form} />
      </Spin>

      <Space >
        <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
        <Button loading={isLoading}>
          <Link to='/projects'>Go to Projects <RollbackOutlined /></Link>
        </Button>
      </Space>
    </div>
  )
}

export default Project
