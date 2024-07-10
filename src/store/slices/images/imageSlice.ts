/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { editImages, fetchImageById, fetchImages } from './imageThunk'

const initialState: any = {
  images: [],
  isLoading: false,
  error: null,
  image: [],
}

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    initialise: (state) => {
      state.images = []
      state.isLoading = false
      state.error = null
    },
    restore: (state, action: PayloadAction<any[]>) => {
      state.images = action.payload
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.images = action.payload
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(editImages.fulfilled, (state, action) => {
        const index = state.images.findIndex((image: any) => image.id === action.payload)
        if (index !== -1) {
          state.images[index].status = action.payload
        }
      })
      .addCase(fetchImageById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchImageById.fulfilled, (state, action) => {
        state.isLoading = false
        state.image = action.payload
      })
      .addCase(fetchImageById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string // Payload is error message
      })
  },
})

export const { initialise, restore } = imageSlice.actions

export default imageSlice.reducer
