import React, { FC } from 'react'
import { Layout } from 'antd'
const { Footer: AntFooter } = Layout

const Footer: FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </AntFooter>
  )
}

export default Footer
