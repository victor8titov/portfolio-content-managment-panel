import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'

import App from './App'
import store from './store'

import Error404 from './components/pages/404'
import Homepage from './components/pages/homepage'
import Authentication from './components/pages/authentication'
import Login from './components/pages/login'
import Alert from './components/common/alert'

const root = createRoot(document.getElementById('root') as Element)

root.render(
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Authentication />}>
              <Route element={<App />} >
                <Route path='homepage' element={<Homepage />} />
              </Route>
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
      </BrowserRouter>
      <Alert />
    </Provider>
)
