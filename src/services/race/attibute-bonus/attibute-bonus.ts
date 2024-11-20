import { API_RESPONSE } from "@/types/api"
import { RaceAttributeBonusTable, Join_SubRace_Attribute } from "@/types/tables/race"
import { RaceAttributeBonus } from "@/types/tables/race/base"

export const getAllAttributeBonusJoinSubRaceAttribute = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race-attribute-bonus/join_subRace_attribute`)
  const response = await res.json() as API_RESPONSE<Join_SubRace_Attribute[]>
  return response
}

export const createAttributeBonus = async (attributeBonus: RaceAttributeBonus) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race-attribute-bonus/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attributeBonus),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}

export const updateAttributeBonus = async (attributeBonus: RaceAttributeBonusTable) => {
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