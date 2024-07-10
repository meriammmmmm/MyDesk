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
  status: number // Adjust type as per your API response
  data: any // Adjust type based on your actual response structure
}
export async function createEditUser(newImages: any, id?: any): Promise<ApiResponse> {
  let imagePath = null
  interface ApiResponse {
    status: number // Adjust type as per your API response
    data: any // Adjust type based on your actual response structure
  }
  if (newImages.image instanceof File) {
    const imageName = `${Math.random()}-${newImages.image.name.replaceAll('/', '')}`
    imagePath = `${supabaseUrl}/storage/v1/object/public/users/${imageName}`

    const { error: storageError } = await supabase.storage
      .from('users')
      .upload(imageName, newImages.image)

    if (storageError) {
      console.error(storageError)
      throw new Error('User  could not be uploaded')
    }
  } else if (newImages.image?.startsWith?.(supabaseUrl)) {
    imagePath = newImages.image
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

  return data
}
export async function getUserById(id: any) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

  if (error) {
    console.error(error)
    throw new Error('User could not be fetched')
  }

  return data
}
