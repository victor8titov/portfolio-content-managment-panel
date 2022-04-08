import React, { FC } from 'react'
import { Layout } from 'antd'
const { Header: AntHeader } = Layout

const Header: FC = () => {
  return (
    <AntHeader
      className="site-layout-background"
      style={{ padding: 0 }}></AntHeader>
  )
}

export default Header
