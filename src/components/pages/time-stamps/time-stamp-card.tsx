import React, { FC, useCallback, useMemo, useState } from 'react'
import { Card, Empty, Modal } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons'
import { TimeStampView } from '../../../api/types/time-stamp.types'

type PropsCard = {
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
  timeStamp: TimeStampView
  isDeleting: boolean
}

const TimeStampCard: FC<PropsCard> = (props) => {
  const { timeStamp, onDelete, onUpdate, isDeleting } = props

  const [isRolledUp, setIsRolledUp] = useState<boolean>(true)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const description = useMemo(() =>
    timeStamp.description.slice(0, 50) + (timeStamp.description.length && timeStamp.description.length > 50 ? '...' : ''),
  [timeStamp])

  const handleClickDelete = useCallback(() => {
    const handleOk = () => {
      setIsDeleted(true)
      onDelete(timeStamp.id)
    }
    Modal.confirm({ title: 'Are you sure you want to delete?', onOk: handleOk })
  }, [onDelete, timeStamp])

  const handleClickUpdate = useCallback(() => {
    onUpdate(timeStamp.id)
  }, [onUpdate, timeStamp])

  const handleClickDescription = useCallback(() => {
    setIsRolledUp(state => !state)
  }, [])

  if (isDeleted) return <Empty className='time-stamp-card_empty' image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />

  return (
    <Card
      className='time-stamp-card'
      actions={[
        <EditOutlined onClick={handleClickUpdate} key='update' />,
        isDeleting ? <StopOutlined key='disable' /> : <DeleteOutlined onClick={handleClickDelete} key='delete' />
      ]}>
        <Title level={5}>{timeStamp.name}</Title>
        <div className='time-stamp-card__description' onClick={handleClickDescription}>
          {isRolledUp
            ? <Text>{description}</Text>
            : <Text>{timeStamp.description}</Text>
          }
        </div>
    </Card>
  )
}

export default TimeStampCard
