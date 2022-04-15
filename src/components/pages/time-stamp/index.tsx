import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import useFormManager from './hooks/form-manager'
import TimeStampForm from './form'
import './styles.scss'
import { ADMIN, pathJoin, TIME_STAMPS } from '../../../constants/routes'

const { useBreakpoint } = Grid

const TimeStamp: FC = () => {
  const { form, onSave, isLoading, mode } = useFormManager()

  const screens = useBreakpoint()
  const isDesktop = useMemo(() => screens.md, [screens])

  const GoBack: FC = () => {
    return (
      <Button loading={isLoading}>
        <Link to={pathJoin(ADMIN, TIME_STAMPS)}>{isDesktop ? 'Go to Time Stamps ' : ''} <RollbackOutlined /></Link>
      </Button>
    )
  }

  return (
    <div className='time-stamp'>
      <div className='time-stamp__title'>
        <Title>Time Stamp</Title>
        <GoBack />
      </div>

      <Spin spinning={isLoading}>
        <TimeStampForm form={form} />
      </Spin>

      <Space >
        <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
        <GoBack />
      </Space>
    </div>
  )
}

export default TimeStamp
