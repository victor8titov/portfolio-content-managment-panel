import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

import Footer from './components/common/footer'
import Header from './components/common/header'
import Aside from './components/common/aside'
import MainSection from './components/common/main-section'

const App: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
      <Layout className='portfolio'>
        <Aside onCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />

        <Layout>
          <Header isCollapsed={isCollapsed} onCollapsed={setIsCollapsed} />

          <MainSection>
            <Outlet />
          </MainSection>

          <Footer />
        </Layout>
    </Layout>
  )
}

export default App
