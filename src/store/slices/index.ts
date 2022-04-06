import { combineReducers } from 'redux'
import profile from './profile'
import homePage from './homepage'
import alert from './alert'

const rootReducer = combineReducers({
  profile,
  alert,
  homePage
})

export default rootReducer
