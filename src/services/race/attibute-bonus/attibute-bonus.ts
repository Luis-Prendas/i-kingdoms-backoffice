import { API_RESPONSE } from "@/types/api"
import { DB_RaceAttributeBonus, DB_RaceAttributeBonusJoinSubRaceAttribute, Base_RaceAttributeBonus } from "@/types/tables/race/race-attribute-bonus/race-attribute-bonus"

export const getAllAttributeBonusJoinSubRaceAttribute = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/attribute-bonus/join-subrace-attribute`)
  const response = await res.json() as API_RESPONSE<DB_RaceAttributeBonusJoinSubRaceAttribute[]>
  return response
}

export const createAttributeBonus = async (attributeBonus: Base_RaceAttributeBonus) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/attribute-bonus/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attributeBonus),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}

export const updateAttributeBonus = async (attributeBonus: DB_RaceAttributeBonus) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/attribute-bonus/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attributeBonus),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}

export const deleteAttributeBonus = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/attribute-bonus/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}