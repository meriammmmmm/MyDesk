// cabinsSlice.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import { createEditUser, deleteUser, getUserById, getUsers } from '@src/services/userAuth'
import { fetchImages } from '../images/imageThunk'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await getUsers()
})
export const addUser = createAsyncThunk('User/addUser', async (userData: any, thunkAPI) => {
  try {
    const response = await createEditUser(userData, userData?.id)

    // Assuming createEditUser returns an object with 'status' and 'data' properties
    if (response && response.status === 201) {
      thunkAPI.dispatch(fetchImages())
      return response.data
    } else {
      throw new Error('Failed to add user') // Handle case when status !== 201
    }
  } catch (error) {
    console.error('Error adding user:', error)
    throw error // Rethrow or handle the error as needed
  }
})
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const user = await getUserById(id)

      return user
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      return rejectWithValue('User not found')
    }
  },
)
export const editUser = createAsyncThunk(
  'user/editUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await createEditUser(userData, userData?.id)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error('Error editing user:', error)
      return rejectWithValue('User could not be edited')
    }
  },
)
export const removeUser = createAsyncThunk('user/removeUser', async (userId: string, thunkAPI) => {
  try {
    const data = await deleteUser(userId)
    if (data) {
      thunkAPI.dispatch(fetchUsers())

      return data
    } else {
      return 'No data returned'
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return 'User could not be deleted'
  }
})
