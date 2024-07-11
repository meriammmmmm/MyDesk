// apiCabins.js

import supabase, { supabaseUrl } from './supabase'
interface ApiResponse {
  status: number // Adjust type as per your API response
  data: any // Adjust type based on your actual response structure
}
export async function getImages() {
  const { data, error } = await supabase.from('images').select('*')

  if (error) {
    console.error(error)
    throw new Error('images could not be loaded')
  }

  return data
}
// apiCabins.js

export const updateImages = async (newImagesData: any, id: string) => {
  const { status, startTime } = newImagesData // Extract status and startTime from newImagesData

  try {
    const { data, error } = await supabase
      .from('images')
      .update({ status, startTime })
      .eq('id', id)
      .select('*')

    if (error) {
      throw new Error(error.message) // Throw error if update fails
    }

    return data // Return updated data if successful
  } catch (error) {
    console.log(error)

    throw error // Rethrow or handle the error as needed
  }
}
export async function createEditImages(newImages: any, id?: any): Promise<ApiResponse> {
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
    // When editing, if no new image is provided, retain the existing image path
    const { data: existingData, error: fetchError } = await supabase
      .from('images')
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
    query = supabase.from('images').insert([{ ...newImages, image: imagePath }])
  } else {
    query = supabase
      .from('images')
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

export async function getImageById(id: any) {
  const { data, error } = await supabase.from('images').select('*').eq('id', id).single()

  if (error) {
    console.error(error)
    throw new Error('Images could not be fetched')
  }

  return data
}
export async function deleteImage(id: any) {
  const { data, error } = await supabase.from('images').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Images could not be deleted')
  }

  return data
}
