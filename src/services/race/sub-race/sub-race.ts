import { API_RESPONSE } from "@/types/api"
import { DB_SubRace, DB_SubRaceJoinRace, SubRace } from "@/types/tables/race/sub-race/sub-race"

export const getAllSubRaces = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race`)
  const response = await res.json() as API_RESPONSE<DB_SubRace[]>
  return response
}

export const getAllSubRacesJoinRace = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/join-race`)
  const response = await res.json() as API_RESPONSE<DB_SubRaceJoinRace[]>
  return response
}

export const createSubRace = async (subRace: SubRace) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subRace),
  })
  const response = await res.json() as API_RESPONSE<number[]>
  return response
}

export const updateSubRace = async (subRace: DB_SubRace) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subRace),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}