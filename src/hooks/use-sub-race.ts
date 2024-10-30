import { getAllSubRacesJoinRace } from "@/services/race/sub-race/sub-race"
import { API_RESPONSE } from "@/types/api"
import { DB_SubRaceJoinRace } from "@/types/tables/race/sub-race/sub-race"
import { useQuery } from "@tanstack/react-query"


export const useGetAllSubRacesJoinRace = () => {
  const fetchData = async () => {
    const res = await getAllSubRacesJoinRace()
    return res
  }

  return useQuery<API_RESPONSE<DB_SubRaceJoinRace[]>, Error>({
    queryKey: ['useGetAllSubRacesJoinRace'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}