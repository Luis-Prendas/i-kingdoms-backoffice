import { createSubRace, getAllSubRaces, getAllSubRacesJoinRace, updateSubRace } from "@/services/race/sub-race/sub-race"
import { API_RESPONSE } from "@/types/api"
import { SubRaceTable, Join_Race } from "@/types/tables/race" 
import { SubRace } from "@/types/tables/race/base" 
import { useQuery } from "@tanstack/react-query"

export const useGetAllSubRaces = () => {
  const fetchData = async () => {
    const res = await getAllSubRaces()
    return res
  }

  return useQuery<API_RESPONSE<SubRaceTable[]>, Error>({
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

  return useQuery<API_RESPONSE<Join_Race[]>, Error>({
    queryKey: ['useGetAllSubRacesJoinRace'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateSubRace = async ({ subRace }: { subRace: SubRace }) => {
  const res = await createSubRace(subRace)
  return res
}

export const useUpdateSubRace = async ({ subRace }: { subRace: SubRaceTable }) => {
  const res = await updateSubRace(subRace)
  return res
}