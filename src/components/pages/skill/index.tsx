import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import SkillForm from './form'
import useFormManager from './hooks/form-manager'
import './styles.scss'

const Skill: FC = () => {
  const { form, groups, onSave, isLoading, mode } = useFormManager()
  return (
    <div className='skill'>
      <div className='skill__title'>
        <Title>Skill</Title>
        <Button>
          <Link to='/skills'>Go to Skills <RollbackOutlined /></Link>
        </Button>
      </div>

      <Spin spinning={isLoading}>
        <SkillForm form={form} groups={groups} />
      </Spin>

      <Space >
        <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
        <Button loading={isLoading}>
          <Link to='/skills'>Go to Skills <RollbackOutlined /></Link>
        </Button>
      </Space>
    </div>
  )
}

export default Skill
