import React, { FC, useEffect } from 'react'
import { Rate } from 'antd'

type Props = {
  value?: number
  onChange?: (rate: number) => void
  total: number
  defaultValue?: number
}

const ChooseRate: FC<Props> = (props) => {
  const { value, onChange, total = 10, defaultValue = 0 } = props

  useEffect(() => {
    if (onChange) onChange(defaultValue)
    // eslint-disable-next-line
  }, [])

  return (
    <Rate onChange={onChange} value={value} defaultValue={defaultValue} count={total}/>
  )
}

export default ChooseRate
