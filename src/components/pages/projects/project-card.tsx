import React, { FC, useCallback, useMemo, useState } from 'react'
import { Card, Empty, Modal, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { DeleteOutlined, EditOutlined, StarOutlined, StarTwoTone, StopOutlined } from '@ant-design/icons'
import { ProjectView } from '../../../api/types/projects'

type PropsCard = {
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
  project: ProjectView
  isDeleting: boolean
}

const ProjectCard: FC<PropsCard> = (props) => {
  const { project, onDelete, onUpdate, isDeleting } = props

  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const description = useMemo(() => project.description.slice(0, 50) + (project.description.length && project.description.length > 50 ? '...' : ''), [project])

  const handleClickDelete = useCallback(() => {
    const handleOk = () => {
      setIsDeleted(true)
      onDelete(project.id)
    }
    Modal.confirm({ title: 'Are you sure you want to delete?', onOk: handleOk })
  }, [onDelete, project])

  const handleClickUpdate = useCallback(() => {
    onUpdate(project.id)
  }, [onUpdate, project])

  if (isDeleted) return <Empty className='project-card_empty' image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />

  return (
    <Card
      className='project-card'
      actions={[
        <EditOutlined onClick={handleClickUpdate} key='update' />,
        isDeleting ? <StopOutlined key='disable' /> : <DeleteOutlined onClick={handleClickDelete} key='delete' />
      ]}>
        <Title level={5}>{project.name}</Title>
        <div className='project-card__description'>
          <Text>{description}</Text>
        </div>

    </Card>
  )
}

export default ProjectCard
