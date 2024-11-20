import { API_RESPONSE } from "@/types/api"
import { AttributeTable } from "@/types/tables/attribute"
import { Attribute } from "@/types/tables/attribute/base"

export const getAllAtributes = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute`)
  const response = await res.json() as API_RESPONSE<AttributeTable[]>

  return response
}

export const createAttribute = async (attribute: Attribute) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attribute),
  })

  const response = await res.json() as API_RESPONSE<number[]>

  console.log(response)

  return response
}

export const editAttribute = async (attribute: Attribute) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attribute),
  })

  const response = await res.json() as API_RESPONSE<number>

  return response
}

export const deleteAttribute = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  const response = await res.json() as API_RESPONSE<null>

  return response
}