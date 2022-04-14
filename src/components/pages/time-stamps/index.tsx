import React, { FC, useCallback, useMemo, useState } from 'react'
import { Affix, Button, Grid, Spin, Switch, Timeline } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'

import { Language } from '../../../types/common'
import useTimeStampsManager from './hooks/time-stamps-manager'
import { TimeStampView } from '../../../api/types/time-stamp.types'
import LabelTimeStamp from './label-time-stamp'
import TimeStampCard from './time-stamp-card'
import './styles.scss'

const { useBreakpoint } = Grid

const TimeStamps: FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN)
  const { timeStamps, isLoading, onUpdate, onDelete, isDeleting, onAddNew } = useTimeStampsManager(language)

  const screens = useBreakpoint()
  const isDesktop = useMemo(() => screens.sm, [screens])

  const handleChangeLanguage = useCallback((checked: boolean) => {
    setLanguage(checked ? Language.EN : Language.RU)
  }, [])

  return (
    <div className='time-stamps'>
      <Title>Time stamps</Title>
      <Text>Here you can configure content for your career.</Text>

      <div className='time-stamps__add-box'>
        <Affix offsetTop={10}>
          <Button type='primary' onClick={onAddNew}>
            Add new Time stamp
          </Button>
        </Affix>

        <Switch
          checkedChildren={'En'}
          unCheckedChildren={'Ru'}
          onChange={handleChangeLanguage}
          defaultChecked
        />
      </div>

      <Spin spinning={isLoading}>
        <div className='time-stamps__body'>
        {isDesktop
          ? <Timeline mode='left'>
              {timeStamps.map((item: TimeStampView) => (
                <Timeline.Item label={<LabelTimeStamp events={item.events} />} key={item.id}>
                  <TimeStampCard onUpdate={onUpdate} isDeleting={isDeleting} onDelete={onDelete} timeStamp={item} />
                </Timeline.Item>))
              }
            </Timeline>
          : null
        }
        {!isDesktop
          ? timeStamps.map((item: TimeStampView) => (
              <div key={item.id}>
                <LabelTimeStamp events={item.events} />
                <TimeStampCard onUpdate={onUpdate} isDeleting={isDeleting} onDelete={onDelete} timeStamp={item} />
              </div>))
          : null
        }
        </div>
      </Spin>
    </div>
  )
}

export default TimeStamps
