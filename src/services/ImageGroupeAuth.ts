// apiCabins.js

import supabase, { supabaseUrl } from './supabase'

export async function getImageGroupe() {
  const { data, error } = await supabase.from('imageGroupe').select('*')

  if (error) {
    console.error(error)
    throw new Error('imageGroupe could not be loaded')
  }

  return data
}

export async function deleteImageGroupe(id: any) {
  const { data, error } = await supabase.from('imageGroupe').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('imageGroupe could not be deleted')
  }

  return data
}

export async function createEditImageGroupe(newUserGroupe: any, id?: any) {
  let query: any

  if (!id) {
    query = supabase.from('imageGroupe').insert([{ ...newUserGroupe }])
  } else {
    query = supabase
      .from('imageGroupe')
      .update({ ...newUserGroupe })
      .eq('id', id)
  }

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('UserGroupe could not be created/edited')
  }

  return data
}
export async function getImageGroupeById(id: any) {
  const { data, error } = await supabase.from('imageGroupe').select('*').eq('id', id).single()

  if (error) {
    console.error(error)
    throw new Error('imageGroupe could not be fetched')
  }

  return data
}
