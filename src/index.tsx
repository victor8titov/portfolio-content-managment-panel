import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'
// import { createRoot } from 'react-dom/client'

import App from './App'
import store from './store'
import * as routes from './constants/routes'
import './styles/main.scss'

import Login from './components/pages/login'
import Error404 from './components/pages/404'
import Authentication from './components/common/authentication'
import Gallery from './components/pages/gallery'
import Alert from './components/common/alert'
import Suspense from './components/common/suspense'

const Homepage = lazy(() => import('./components/pages/homepage'))
const Projects = lazy(() => import('./components/pages/projects'))
const Skills = lazy(() => import('./components/pages/skills'))
const Skill = lazy(() => import('./components/pages/skill'))
const TimeStamps = lazy(() => import('./components/pages/time-stamps'))
const TimeStamp = lazy(() => import('./components/pages/time-stamp'))
const Project = lazy(() => import('./components/pages/project'))
const SocialMedia = lazy(() => import('./components/pages/social-media'))
const SocialMediaLink = lazy(() => import('./components/pages/social-media-link'))

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
              <Route path={routes.HOMEPAGE} element={<Suspense component={Homepage} />} />
              <Route path={routes.PROJECTS} element={<Suspense component={Projects} />} />
              <Route path={routes.PROJECT} element={<Suspense component={Project} />} />
              <Route path={routes.SKILLS} element={<Suspense component={Skills} />} />
              <Route path={routes.SKILL} element={<Suspense component={Skill} />} />
              <Route path={routes.TIME_STAMPS} element={<Suspense component={TimeStamps} />} />
              <Route path={routes.TIME_STAMP} element={<Suspense component={TimeStamp} />} />
              <Route path={routes.SOCIAL_MEDIA} element={<Suspense component={SocialMedia} />} />
              <Route path={routes.SOCIAL_MEDIA_LINK} element={<Suspense component={SocialMediaLink} />} />
              <Route path={routes.GALLERY} element={<Gallery />} />
              <Route path='' element={<Login />} />
            </Route>
          </Route>

          <Route path={routes.pathJoin(routes.ADMIN, routes.LOGIN)} element={<Login />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      <Alert />
    </Provider>, document.getElementById('root'))
