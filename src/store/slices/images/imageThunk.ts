// cabinsSlice.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createEditImages,
  deleteImage,
  getImageById,
  getImages,
  updateImages,
} from '@src/services/imageApi'

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  return await getImages()
})
export const editImages = createAsyncThunk(
  'images/editImages',
  async ({ newImagesData, id }: { newImagesData: any; id: string }, thunkAPI) => {
    try {
      if (newImagesData.status) {
        newImagesData.startTime = Date.now()
      }

      const data = await updateImages(newImagesData, id)

      thunkAPI.dispatch(fetchImages())
      return data
    } catch (error) {
      return
    }
  },
)
export const addImages = createAsyncThunk(
  'images/addImages',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await createEditImages(userData, userData?.id)
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
export const PatchImages = createAsyncThunk(
  'images/PatchImages',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await createEditImages(userData, userData?.id)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error('Error editing user:', error)
      return rejectWithValue('User could not be edited')
    }
  },
)
export const fetchImageById = createAsyncThunk(
  'images/fetchImageById',
  async (id: string, { rejectWithValue }) => {
    try {
      const user = await getImageById(id)

      return user
    } catch (error) {
      console.error('Error fetching images by ID:', error)
      return rejectWithValue('Image not found')
    }
  },
)
export const removeImage = createAsyncThunk(
  'images/removeImage',
  async (userId: string, thunkAPI) => {
    try {
      const data = await deleteImage(userId)
      if (data) {
        thunkAPI.dispatch(fetchImages())

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
