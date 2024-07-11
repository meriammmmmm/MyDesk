// apiCabins.js

import supabase, { supabaseUrl } from './supabase'

export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    console.error(error)
    throw new Error('Users could not be loaded')
  }

  return data
}

export async function deleteUser(id: any) {
  const { data, error } = await supabase.from('users').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Users could not be deleted')
  }

  return data
}

interface ApiResponse {
  status: number
  data: any
}
export async function createEditUser(newImages: any, id?: any): Promise<ApiResponse> {
  let imagePath = null

  if (newImages.image instanceof File) {
    const imageName = `${Math.random()}-${newImages.image.name.replaceAll('/', '')}`
    imagePath = `${supabaseUrl}/storage/v1/object/public/users/${imageName}`

    const { error: storageError } = await supabase.storage
      .from('users')
      .upload(imageName, newImages.image)

    if (storageError) {
      console.error(storageError)
      throw new Error('User image could not be uploaded')
    }
  } else if (newImages.image?.startsWith?.(supabaseUrl)) {
    imagePath = newImages.image
  } else if (!newImages.image && id) {
    const { data: existingData, error: fetchError } = await supabase
      .from('users')
      .select('image')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error(fetchError)
      throw new Error('Could not fetch existing user data')
    }
    imagePath = existingData.image
  }

  let query

  if (!id) {
    query = supabase.from('users').insert([{ ...newImages, image: imagePath }])
  } else {
    query = supabase
      .from('users')
      .update({ ...newImages, image: imagePath })
      .eq('id', id)
  }

  const { data, error } = await query.single()

  if (error) {
    console.error(error)
    throw new Error('User could not be created/edited')
  }

  return { status: 200, data }
}
export async function getUserById(id: any) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

  if (error) {
    console.error(error)
    throw new Error('User could not be fetched')
  }

  return data
}
