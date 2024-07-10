/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserById, fetchUsers } from './userThunk'

const initialState: any = {
  users: [],
  isLoading: false,
  error: null,
  user: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initialise: (state) => {
      state.users = []
      state.isLoading = false
      state.error = null
    },
    restore: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string // Payload is error message
      })
  },
})

export const { initialise, restore } = userSlice.actions

export default userSlice.reducer
