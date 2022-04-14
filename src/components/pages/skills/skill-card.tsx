import React, { FC, useCallback, useMemo, useState } from 'react'
import { Card, Empty, Modal, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { DeleteOutlined, EditOutlined, StarOutlined, StarTwoTone, StopOutlined } from '@ant-design/icons'

import { SkillView } from '../../../api/types/skills.types'

type PropsCard = {
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
  skill: SkillView
  isDeleting: boolean
}

const SkillCard: FC<PropsCard> = (props) => {
  const { skill, onDelete, onUpdate, isDeleting } = props

  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const description = useMemo(() => skill.description.slice(0, 50) + (skill.description.length && skill.description.length > 50 ? '...' : ''), [skill])

  const handleClickDelete = useCallback(() => {
    const handleOk = () => {
      setIsDeleted(true)
      onDelete(skill.id)
    }
    Modal.confirm({ title: 'Are you sure you want to delete?', onOk: handleOk })
  }, [onDelete, skill])

  const handleClickUpdate = useCallback(() => {
    onUpdate(skill.id)
  }, [onUpdate, skill])

  const Level: FC = () => {
    const stars = []
    for (let i = 1; i < 10; i++) {
      if (i <= skill.level) stars[i] = true
      else stars[i] = false
    }

    return (
      <Space direction='horizontal'>
        {stars.map((i, index) => i ? <StarTwoTone key={index} style={{ fontSize: '12px' }} /> : <StarOutlined key={index} style={{ fontSize: '12px' }} />)}
      </Space>)
  }

  if (isDeleted) return <Empty className='skill-card_empty' image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />

  return (
    <Card
      className='skill-card'
      actions={[
        <EditOutlined onClick={handleClickUpdate} key='update' />,
        isDeleting ? <StopOutlined key='disable' /> : <DeleteOutlined onClick={handleClickDelete} key='delete' />
      ]}>
        <Title level={5}>{skill.name}</Title>
        <div className='skill-card__description'>
          <Text>{description}</Text>
        </div>
        <div>
          <Level />
        </div>
    </Card>
  )
}

export default SkillCard
