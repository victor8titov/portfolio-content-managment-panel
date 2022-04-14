import { combineReducers } from 'redux'
import profile from './profile'
import homePage from './homepage'
import alert from './alert'
import upload from './uploads'
import gallery from './gallery'
import skills from './skills'
import timeStamps from './time-stamps'
import projects from './projects'
import socialMedia from './social-media'

const rootReducer = combineReducers({
  profile,
  alert,
  homePage,
  skills,
  timeStamps,
  projects,
  socialMedia,
  upload,
  gallery
})

export default rootReducer
