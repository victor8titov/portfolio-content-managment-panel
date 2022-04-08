import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

import Footer from './components/common/footer'
import Header from './components/common/header'
import Aside from './components/common/aside'
import MainSection from './components/common/main-section'
import './styles.scss'

const App: FC = () => {
  return (
    <Layout className='portfolio'>
      <Aside />

      <Layout>

        <Header />

        <MainSection>
          <Outlet />
        </MainSection>

       <Footer />

      </Layout>
    </Layout>
  )
}

export default App
