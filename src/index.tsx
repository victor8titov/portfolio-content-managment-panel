import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'

import App from './App'
import store from './store'

import Error404 from './components/pages/404'
import Homepage from './components/pages/homepage'
import Authentication from './components/common/authentication'
import Login from './components/pages/login'
import Alert from './components/common/alert'
import Projects from './components/pages/projects'
import Skills from './components/pages/skills'
import Gallery from './components/pages/gallery'
import Skill from './components/pages/skill'
import TimeStamps from './components/pages/time-stamps'
import TimeStamp from './components/pages/time-stamp'
import Project from './components/pages/project'
import SocialMedia from './components/pages/social-media'
import SocialMediaLink from './components/pages/social-media-link'

// const root = createRoot(document.getElementById('root') as Element)

// TODO have problem with select from antd. Browser freeze if use antd select
// it is happening if use react 18
// root.render(

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path='admin/' element={<Authentication />}>
              <Route element={<App />} >
                <Route path='homepage' element={<Homepage />} />
                <Route path='projects' element={<Projects />} />
                <Route path='projects/:projectId' element={<Project />} />
                <Route path='skills' element={<Skills />} />
                <Route path='skills/:skillId' element={<Skill />} />
                <Route path='time-stamps' element={<TimeStamps />} />
                <Route path='time-stamps/:timeStampId' element={<TimeStamp />} />
                <Route path='social-media' element={<SocialMedia />} />
                <Route path='social-media/:socialMediaId' element={<SocialMediaLink />} />
                <Route path='gallery' element={<Gallery />} />
                <Route path='' element={<Login />} />
              </Route>
            </Route>

            <Route path='admin/login' element={<Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
      </BrowserRouter>
      <Alert />
    </Provider>, document.getElementById('root'))
