import { createSubRace, getAllSubRaces, getAllSubRacesJoinRace, updateSubRace } from "@/services/race/sub-race/sub-race"
import { API_RESPONSE } from "@/types/api"
import { DB_SubRace, DB_SubRaceJoinRace, Base_SubRace } from "@/types/tables/race/sub-race/sub-race"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSubRaces = () => {
  const fetchData = async () => {
    const res = await getAllSubRaces()
    return res
  }

  return useQuery<API_RESPONSE<DB_SubRace[]>, Error>({
    queryKey: ['useGetAllSubRaces'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

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

export const useCreateSubRace = async ({ subRace }: { subRace: Base_SubRace }) => {
  const res = await createSubRace(subRace)
  return res
}

export const useUpdateSubRace = async ({ subRace }: { subRace: DB_SubRace }) => {
  const res = await updateSubRace(subRace)
  return res
}