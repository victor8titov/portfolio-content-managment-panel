import { combineReducers } from 'redux'
import profile from './profile'
import homePage from './homepage'
import alert from './alert'
import upload from './uploads'
import gallery from './gallery'

const rootReducer = combineReducers({
  profile,
  alert,
  homePage,
  upload,
  gallery
})

export default rootReducer
