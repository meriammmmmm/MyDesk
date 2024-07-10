// cabinsSlice.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createEditImageGroupe,
  deleteImageGroupe,
  getImageGroupe,
  getImageGroupeById,
} from '@src/services/ImageGroupeAuth'

export const fetchImageGroupe = createAsyncThunk('imageGroupe/fetchImageGroupe', async () => {
  return await getImageGroupe()
})
export const addImageGroupe = createAsyncThunk(
  'ImageGroupe/addImageGroupe',
  async (imageData: any, { rejectWithValue }) => {
    try {
      const response = await createEditImageGroupe(imageData, imageData?.id)
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
export const fetchImageGroupeById = createAsyncThunk(
  'imageGroupe/fetchImageGroupeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const imageGroupe = await getImageGroupeById(id)

      return imageGroupe
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      return rejectWithValue('User not found')
    }
  },
)
export const editImageGroupe = createAsyncThunk(
  'imageGroupe/editImageGroupe',
  async (imageGroupe: any, { rejectWithValue }) => {
    try {
      const response = await createEditImageGroupe(imageGroupe, imageGroupe?.id)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error('Error editing user:', error)
      return rejectWithValue('User could not be edited')
    }
  },
)
export const removeImageGrouper = createAsyncThunk(
  'imageGroupe/removeImageGroupe',
  async (imageId: string, thunkAPI) => {
    try {
      const data = await deleteImageGroupe(imageId)
      if (data) {
        thunkAPI.dispatch(fetchImageGroupe())

        return data
      } else {
        return 'No data returned'
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      return 'Image could not be deleted'
    }
  },
)
