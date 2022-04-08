import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'

import App from './App'
import store from './store'

import Error404 from './components/pages/404'
import Homepage from './components/pages/homepage/homepage'
import Authentication from './components/common/authentication'
import Login from './components/pages/login'
import Alert from './components/common/alert'
import Projects from './components/pages/projects'
import Skills from './components/pages/skills'
import TimeStamp from './components/pages/time-stamp'
import Gallery from './components/pages/Gallery'

const root = createRoot(document.getElementById('root') as Element)

root.render(
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Authentication />}>
              <Route element={<App />} >
                <Route path='homepage' element={<Homepage />} />
                <Route path='projects' element={<Projects />} />
                <Route path='skills' element={<Skills />} />
                <Route path='time-stamp' element={<TimeStamp />} />
                <Route path='gallery' element={<Gallery />} />
              </Route>
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
      </BrowserRouter>
      <Alert />
    </Provider>
)
