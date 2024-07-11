// src/store/slices/auth/authThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  login as supabaseLogin,
  signup as supabaseSignup,
  logout as supabaseLogout,
  resetPassword as supabaseResetPassword,
  updateCurrentUser as supabaseUpdateCurrentUser,
  User,
  updateCurrentUser,
  refreshSession,
} from '../../../services/apiAuth'
import { LoginPayload, RegisterPayload } from './authTypes'
import supabase from '@src/services/supabase'

export const login = createAsyncThunk(
  'auth/login',
  async (query: LoginPayload, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: query.email,
        password: query.password,
      })

      if (error) {
        throw new Error(error.message)
      }

      const { session } = data
      if (session) {
        const { access_token: accessToken, refresh_token: refreshToken, user } = session
        return { accessToken, refreshToken, user }
      } else {
        throw new Error('No session found')
      }
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error('dd')
  return data?.user
})

export const register = createAsyncThunk<User, RegisterPayload>(
  'auth/register',
  async (query, { rejectWithValue }) => {
    try {
      const user = await supabaseSignup(query)
      if (!user) throw new Error('Registration failed')
      return user
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await supabaseLogout()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const resetPasswords = createAsyncThunk<void, { email: string }>(
  'auth/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      await supabaseResetPassword(email)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (
    { oldPassword, password, token }: { oldPassword?: string; password: string; token?: string },
    { rejectWithValue },
  ) => {
    try {
      await updateCurrentUser({ password }) // Ensure this function is correctly imported and defined

      // Optionally, return data or handle other actions upon success
      return { success: true }
    } catch (error: any) {
      console.error('UpdatePassword Error:', error.message)
      return rejectWithValue(error.message)
    }
  },
)
