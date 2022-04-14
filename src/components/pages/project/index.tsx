import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Space, Spin, Grid } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import useFormManager from './hooks/form-manager'
import ProjectForm from './form'
import ProjectFormImage from './form-image'
import './styles.scss'

const { useBreakpoint } = Grid

const Project: FC = () => {
  const { form, onSave, isLoading, mode } = useFormManager()

  const screens = useBreakpoint()
  const isDesktop = useMemo(() => screens.md, [screens])

  const GoBack: FC = () => {
    return (
      <Button loading={isLoading}>
        <Link to='/admin/projects'>{isDesktop ? 'Go to Projects ' : ''}<RollbackOutlined /></Link>
      </Button>
    )
  }

  return (
    <div className='project'>
      <div className='project__title'>
        <Title>Project</Title>
        <GoBack />
      </div>

      <Row gutter={15}>
        <Col xs={{ span: 24 }} lg={{ span: 15 }}>
          <Spin spinning={isLoading}>
          <ProjectForm form={form} />
          </Spin>
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 9 }} className='project__sidebar'>
          <Title level={4}>Media</Title>
          <div className='project__images-list'>
            <ProjectFormImage form={form} />
          </div>
        </Col>

        <Col span={24}>
          <Space >
            <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
            <GoBack />
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default Project
