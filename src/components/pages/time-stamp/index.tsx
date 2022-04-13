import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import useFormManager from './hooks/form-manager'
import TimeStampForm from './form'
import './styles.scss'

const TimeStamp: FC = () => {
  const { form, onSave, isLoading, mode } = useFormManager()
  return (
    <div className='time-stamp'>
      <div className='time-stamp__title'>
        <Title>Time Stamp</Title>
        <Button>
          <Link to='/time-stamps'>Go to Time Stamps<RollbackOutlined /></Link>
        </Button>
      </div>

      <Spin spinning={isLoading}>
        <TimeStampForm form={form} />
      </Spin>

      <Space >
        <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
        <Button loading={isLoading}>
          <Link to='/time-stamps'>Go to Time Stamps <RollbackOutlined /></Link>
        </Button>
      </Space>
    </div>
  )
}

export default TimeStamp
