import React, { FC } from 'react'
import { Layout } from 'antd'
const { Footer: AntFooter } = Layout

const Footer: FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      Portfolio Content Management Panel ©2022 Created by Viktor Titov
    </AntFooter>
  )
}

export default Footer
