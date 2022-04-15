import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Space, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import { RollbackOutlined } from '@ant-design/icons'

import SkillForm from './form'
import useFormManager from './hooks/form-manager'
import './styles.scss'
import { ADMIN, pathJoin, SKILLS } from '../../../constants/routes'

const { useBreakpoint } = Grid

const Skill: FC = () => {
  const { form, groups, onSave, isLoading, mode } = useFormManager()

  const screens = useBreakpoint()
  const isDesktop = useMemo(() => screens.md, [screens])

  const GoBack: FC = () => {
    return (
      <Button loading={isLoading}>
        <Link to={pathJoin(ADMIN, SKILLS)}>{isDesktop ? 'Go to Skills ' : ''} <RollbackOutlined /></Link>
      </Button>
    )
  }

  return (
    <div className='skill'>
      <div className='skill__title'>
        <Title>Skill</Title>
        <GoBack />
      </div>

      <Spin spinning={isLoading}>
        <SkillForm form={form} groups={groups} />
      </Spin>

      <Space >
        <Button type="primary" onClick={onSave} loading={isLoading}>{mode === 'new' ? 'Create' : 'Update'}</Button>
        <GoBack />
      </Space>
    </div>
  )
}

export default Skill
