import { API_RESPONSE } from "@/types/api"
import { SubClassTable, Join_Class } from "@/types/tables/class"
import { SubClass } from "@/types/tables/class/base"

export const getAllSubClasses = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class/sub-class`)
  const response = await res.json() as API_RESPONSE<SubClassTable[]>
  return response
}

export const getAllSubClassesJoinClass = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class/sub-class/join_class`)
  const response = await res.json() as API_RESPONSE<Join_Class[]>
  return response
}

export const createSubClass = async (subClass: SubClass) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class/sub-class/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subClass),
  })
  const response = await res.json() as API_RESPONSE<number[]>
  return response
}

export const updateSubClass = async (subClass: SubClassTable) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class/sub-class/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subClass),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}

export const deleteSubClass = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class/sub-class/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}