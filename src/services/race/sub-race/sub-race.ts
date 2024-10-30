import { API_RESPONSE } from "@/types/api"
import { DB_SubRaceJoinRace } from "@/types/tables/race/sub-race/sub-race"


export const getAllSubRacesJoinRace = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/sub-race/join-race`)
  const response = await res.json() as API_RESPONSE<DB_SubRaceJoinRace[]>
  return response
}