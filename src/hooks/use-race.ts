import { useEffect, useState } from "react"
import { getAllRaceBonus, getAllRaces } from "../services/race/get-race"

export const useGetAllRaces = () => {
  const [races, setRaces] = useState<GetAllRaces[] | null>(null)

  useEffect(() => {
    getAllRaces().then((res) => {
      setRaces(res.response)
    })
  }, [])

  return { races }
}

export const useGetAllRaceBonus = () => {
  const [bonus, setBonus] = useState<GetAllRaceBonus[] | null>(null)

  useEffect(() => {
    getAllRaceBonus().then((res) => {
      setBonus(res.response)
    })
  }, [])

  return { bonus }
}