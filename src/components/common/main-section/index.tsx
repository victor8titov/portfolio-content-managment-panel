import React, { FC } from 'react'
import { Layout } from 'antd'
import Breadcrumb from '../breadcrumb'
import './styles.scss'
const { Content } = Layout

type Props = {
  children: React.ReactNode;
};

const MainSection: FC<Props> = (props) => {
  const { children } = props
  return (
    <Content className="main-content">

      <Breadcrumb />

      <div className="main-content__section">
        {children}
      </div>
    </Content>
  )
}

export default MainSection
