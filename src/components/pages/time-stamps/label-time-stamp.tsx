import React, { FC } from 'react'
import moment from 'moment'
import { EventAndDate } from '../../../types/common'

const LabelTimeStamp: FC<{events: EventAndDate[]}> = ({ events }) => {
  const getFormattedDate = (date: string) => moment(date).format('YYYY/MM')

  return (
    <div className="time-stamp-label">
      {events.map((event) => (
        <div key={event.status}>
          {event.status}: {getFormattedDate(event.date)}
        </div>
      ))}
    </div>
  )
}

export default LabelTimeStamp
