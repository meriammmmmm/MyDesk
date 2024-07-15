// cabinsSlice.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createEditUserGroupe,
  deleteUserGroupe,
  getUserGroupe,
  getUserGroupeById,
} from '@src/services/userGroupeAuth'
interface ImageDataType {
  id?: string
  status?: boolean
}
export const fetchUserGroupe = createAsyncThunk('userGroupe/fetchUserGroupe', async () => {
  return await getUserGroupe()
})
export const addUserGroupe = createAsyncThunk(
  'UserGroupe/addUserGroupe',
  async (userData: ImageDataType, { rejectWithValue }) => {
    try {
      const response = await createEditUserGroupe(userData, userData?.id)
      if (response.status === 201) {
        return response.data
      }
    } catch (error: any) {
      if (error?.response?.data?.errors?.roles) {
        return rejectWithValue(error?.response?.data?.errors?.roles)
      }
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message)
      } else {
        return rejectWithValue('something went wrong')
      }
    }
  },
)
export const fetchUserGroupeById = createAsyncThunk(
  'userGroupe/fetchUserGroupeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const userGroupe = await getUserGroupeById(id)

      return userGroupe
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      return rejectWithValue('User not found')
    }
  },
)
export const editUserGroupe = createAsyncThunk(
  'user/editUser',
  async (userData: ImageDataType, { rejectWithValue }) => {
    try {
      const response = await createEditUserGroupe(userData, userData?.id)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error('Error editing user:', error)
      return rejectWithValue('User could not be edited')
    }
  },
)
export const removeUserGrouper = createAsyncThunk(
  'user/removeUser',
  async (userId: string, thunkAPI) => {
    try {
      const data = await deleteUserGroupe(userId)
      if (data) {
        thunkAPI.dispatch(fetchUserGroupe())

        return data
      } else {
        return 'No data returned'
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      return 'User could not be deleted'
    }
  },
)
