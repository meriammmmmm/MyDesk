import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import imageReducer from './slices/images/imageSlice'
import userReducer from './slices/users/userSlice'
import userGroupeReducer from './slices/userGroupe/userGoupeSlice'
import imageGroupeReducer from './slices/imageGroupe/imageGoupeSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  images: imageReducer,
  users: userReducer,
  usergroupes: userGroupeReducer,
  imagegroupes: imageGroupeReducer,
})

export default rootReducer
