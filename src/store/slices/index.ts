import { combineReducers } from 'redux'
import profile from './profile'
import homePage from './homepage'
import alert from './alert'
import upload from './uploads'
import gallery from './gallery'
import skills from './skills'

const rootReducer = combineReducers({
  profile,
  alert,
  homePage,
  skills,
  upload,
  gallery
})

export default rootReducer
