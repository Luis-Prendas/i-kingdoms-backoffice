import { API_RESPONSE } from "@/types/api"
import { Join_Race, SubRaceTable } from "@/types/tables/race"
import { SubRace } from "@/types/tables/race/base"

export const getAllSubRaces = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/sub-race`)
  const response = await res.json() as API_RESPONSE<SubRaceTable[]>
  return response
}

export const getAllSubRacesJoinRace = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/sub-race/join_race`)
  const response = await res.json() as API_RESPONSE<Join_Race[]>
  return response
}

export const createSubRace = async (subRace: SubRace) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/sub-race/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subRace),
  })
  const response = await res.json() as API_RESPONSE<number[]>
  return response
}

export const updateSubRace = async (subRace: SubRace) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/sub-race/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subRace),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}