import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'

import App from './App'
import store from './store'
import * as routes from './constants/routes'

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
import './styles/main.scss'

// const root = createRoot(document.getElementById('root') as Element)

// TODO have problem with select from antd. Browser freeze if use antd select
// it is happening if use react 18
// root.render(

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path={routes.ADMIN} element={<Authentication />}>
              <Route element={<App />} >
                <Route path={routes.HOMEPAGE} element={<Homepage />} />
                <Route path={routes.PROJECTS} element={<Projects />} />
                <Route path={routes.PROJECT} element={<Project />} />
                <Route path={routes.SKILLS} element={<Skills />} />
                <Route path={routes.SKILL} element={<Skill />} />
                <Route path={routes.TIME_STAMPS} element={<TimeStamps />} />
                <Route path={routes.TIME_STAMP} element={<TimeStamp />} />
                <Route path={routes.SOCIAL_MEDIA} element={<SocialMedia />} />
                <Route path={routes.SOCIAL_MEDIA_LINK} element={<SocialMediaLink />} />
                <Route path={routes.GALLERY} element={<Gallery />} />
                <Route path='' element={<Login />} />
              </Route>
            </Route>

            <Route path={routes.LOGIN} element={<Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
      </BrowserRouter>
      <Alert />
    </Provider>, document.getElementById('root'))
