// apiCabins.js

import supabase, { supabaseUrl } from './supabase'

export async function getUserGroupe() {
  const { data, error } = await supabase.from('UserGroupe').select('*')

  if (error) {
    console.error(error)
    throw new Error('UserGroupe could not be loaded')
  }

  return data
}

export async function deleteUserGroupe(id: any) {
  const { data, error } = await supabase.from('UserGroupe').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('UserGroupe could not be deleted')
  }

  return data
}

export async function createEditUserGroupe(newUserGroupe: any, id?: any) {
  let imagePath = null

  if (newUserGroupe.image instanceof File) {
    const imageName = `${Math.random()}-${newUserGroupe.image.name.replaceAll('/', '')}`
    imagePath = `${supabaseUrl}/storage/v1/object/sign/users/${imageName}`

    const { error: storageError } = await supabase.storage
      .from('UserGroupe')
      .upload(imageName, newUserGroupe.image)

    if (storageError) {
      console.error(storageError)
      throw new Error('User image could not be uploaded')
    }
  } else if (newUserGroupe.image?.startsWith?.(supabaseUrl)) {
    imagePath = newUserGroupe.image
  }

  let query: any

  if (!id) {
    query = supabase.from('UserGroupe').insert([{ ...newUserGroupe, image: imagePath }])
  } else {
    query = supabase
      .from('UserGroupe')
      .update({ ...newUserGroupe, image: imagePath })
      .eq('id', id)
  }

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('UserGroupe could not be created/edited')
  }

  return data
}
export async function getUserGroupeById(id: any) {
  const { data, error } = await supabase.from('UserGroupe').select('*').eq('id', id).single()

  if (error) {
    console.error(error)
    throw new Error('UserGroupe could not be fetched')
  }

  return data
}
