// src/services/apiAuth.ts
import supabase, { supabaseUrl } from './supabase'

interface AuthPayload {
  fullName?: string
  email: string
  password: string
  avatar?: File
}

export interface User {
  id: string
  email: string
  fullName: string
  avatar: string
}

export async function signup() {
  let { data, error } = await supabase.auth.signUp({
    email: 'someone@email.com',
    password: 'XNYQLdHxUPevoTtRhjxN',
  })

  if (error) throw new Error('Sign up error')

  return data.user
}

export async function login({ email, password }: AuthPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error('Login error')

  return data.user
}
export async function refreshSession() {
  try {
    const { error } = await supabase.auth.refreshSession()
    if (error) {
      console.error('Failed to refresh session:', error.message)
      throw new Error('Failed to refresh session')
    }
  } catch (error: any) {
    console.error('Refresh session error:', error.message)
    throw error
  }
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error('Logout error')
}
interface UserData {
  fullName?: string
  username?: string
  organization?: string
  organizationName?: string
  address?: string
  avatar?: File
  // Add other properties if necessary
}
export type UpdateUserPayload = {
  password?: string
  fullName?: string
  username?: string
  organization?: string
  organizationName?: string
  address?: string
  avatar?: File
  data?: UserData
}

export async function updateCurrentUser({
  password,
  fullName,
  username,
  organization,
  organizationName,
  address,
  avatar,
}: UpdateUserPayload) {
  try {
    let updateData: UpdateUserPayload = {}

    // Prepare the updateData object
    if (password) updateData.password = password
    if (fullName || username || organization || organizationName || address) {
      updateData.data = {}
      if (fullName) updateData.data.fullName = fullName
      if (username) updateData.data.username = username
      if (organization) updateData.data.organization = organization
      if (organizationName) updateData.data.organizationName = organizationName
      if (address) updateData.data.address = address
    }

    // Update the user in Supabase
    const { data, error } = await supabase.auth.updateUser(updateData)
    if (error) {
      console.error('Update user error:', error.message)
      throw new Error('Update user error: ' + error.message)
    }

    // If there's no avatar to upload, return the updated user data
    if (!avatar) return data.user

    // Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`
    const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar)
    if (storageError) {
      console.error('Avatar upload error:', storageError.message)
      throw new Error('Avatar upload error: ' + storageError.message)
    }

    // Update avatar in the user
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
      data: {
        ...updateData.data,
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    })

    if (error2) {
      console.error('Final update user error:', error2.message)
      throw new Error('Final update user error: ' + error2.message)
    }

    return updatedUser
  } catch (error) {
    console.error('UpdateCurrentUser Error:', error)
    throw error
  }
}

export async function resetPassword(email: string): Promise<void> {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw new Error('Reset password error')
}
