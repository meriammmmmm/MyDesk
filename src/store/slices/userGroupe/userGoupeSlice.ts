/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserGroupe, fetchUserGroupeById } from './userGroupeThunk'

const initialState: any = {
  userGroupes: [],
  isLoading: false,
  error: null,
  userGroupe: [],
}

const userGroupeSlice = createSlice({
  name: 'userGroupes',
  initialState,
  reducers: {
    initialise: (state) => {
      state.userGroupes = []
      state.isLoading = false
      state.error = null
    },
    restore: (state, action: PayloadAction<any[]>) => {
      state.userGroupes = action.payload
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserGroupe.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserGroupe.fulfilled, (state, action) => {
        state.isLoading = false
        state.userGroupes = action.payload
      })
      .addCase(fetchUserGroupe.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchUserGroupeById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserGroupeById.fulfilled, (state, action) => {
        state.isLoading = false
        state.userGroupe = action.payload
      })
      .addCase(fetchUserGroupeById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { initialise, restore } = userGroupeSlice.actions

export default userGroupeSlice.reducer
