import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Sider, Content, Footer } = Layout

const App: FC = () => {
  console.log('- App')
  return (
    <Layout>
      <Header style={{ background: 'white' }}>Header</Header>
      <Layout>
        <Sider style={{ background: 'white' }}>Sider</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
