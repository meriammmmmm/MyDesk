/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchImageGroupe, fetchImageGroupeById } from './imageGroupeThunk'

const initialState: any = {
  imageGroupes: [],
  isLoading: false,
  error: null,
  imageGroupe: [],
}

const userGroupeSlice = createSlice({
  name: 'userGroupes',
  initialState,
  reducers: {
    initialise: (state) => {
      state.imageGroupes = []
      state.isLoading = false
      state.error = null
    },
    restore: (state, action: PayloadAction<any[]>) => {
      state.imageGroupes = action.payload
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageGroupe.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchImageGroupe.fulfilled, (state, action) => {
        state.isLoading = false
        state.imageGroupes = action.payload
      })
      .addCase(fetchImageGroupe.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchImageGroupeById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchImageGroupeById.fulfilled, (state, action) => {
        console.log(action.payload)

        state.isLoading = false
        state.imageGroupe = action.payload
      })
      .addCase(fetchImageGroupeById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string // Payload is error message
      })
  },
})

export const { initialise, restore } = userGroupeSlice.actions

export default userGroupeSlice.reducer
