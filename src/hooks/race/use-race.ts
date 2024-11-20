import { createRace, deleteRace, getAllRaces, updateRace } from "@/services/race/get-race"
import { API_RESPONSE } from "@/types/api"
import { RaceTable } from "@/types/tables/race"
import { Race } from "@/types/tables/race/base"
import { useQuery } from "@tanstack/react-query"

export const useGetAllRaces = () => {
  const fetchData = async () => {
    const res = await getAllRaces()
    return res
  }

  return useQuery<API_RESPONSE<RaceTable[]>, Error>({
    queryKey: ['useGetAllRaces'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateRace = async ({ race }: { race: Race }) => {
  const res = await createRace(race)
  return res
}

export const useUpdateRace = async ({ race }: { race: RaceTable }) => {
  const res = await updateRace(race)
  return res
}

export const useDeleteRace = async ({ id }: { id: number }) => {
  const res = await deleteRace(id)
  return res
}