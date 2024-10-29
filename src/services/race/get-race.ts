export const getAllRaces = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/race/all`)
  const response = await res.json() as ApiResponse<GetAllRaces[]>

  return response
}

export const getAllRaceBonus = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/race/race_attribute_bonus/all`)
  const response = await res.json() as ApiResponse<GetAllRaceBonus[]>

  return response
}

export const createRace = async (race: Race) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/race/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(race),
  })

  const response = await res.json() as ApiResponse<null>

  return response
}