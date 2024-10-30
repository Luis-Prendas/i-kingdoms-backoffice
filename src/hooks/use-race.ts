import { createRace, deleteRace, getAllRaces, getAllRacesWithSubRaces, updateRace } from "@/services/race/get-race"
import { API_RESPONSE } from "@/types/api"
import { DB_Race, DB_RaceWithRelation, Race } from "@/types/tables/race/race"
import { useQuery } from "@tanstack/react-query"

export const useGetAllRaces = () => {
  const fetchData = async () => {
    const res = await getAllRaces()
    return res
  }

  return useQuery<API_RESPONSE<DB_Race[]>, Error>({
    queryKey: ['useGetAllRaces'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useGetAllRacesWithSubRaces = () => {
  const fetchData = async () => {
    const res = await getAllRacesWithSubRaces()
    return res
  }

  return useQuery<API_RESPONSE<DB_RaceWithRelation[]>, Error>({
    queryKey: ['useGetAllRacesWithSubRaces'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateRace = async ({ race }: { race: Race }) => {
  const res = await createRace(race)
  return res
}

export const useUpdateRace = async ({ race }: { race: DB_Race }) => {
  const res = await updateRace(race)
  return res
}

export const useDeleteRace = async ({ id }: { id: number }) => {
  const res = await deleteRace(id)
  return res
}