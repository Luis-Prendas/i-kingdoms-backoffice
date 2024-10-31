import { API_RESPONSE } from "@/types/api"
import { DB_Race, DB_RaceWithRelation, Base_Race } from "@/types/tables/race/race"

export const getAllRaces = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race`)
  const response = await res.json() as API_RESPONSE<DB_Race[]>
  return response
}

export const getAllRacesWithSubRaces = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/join-subrace`)
  const response = await res.json() as API_RESPONSE<DB_RaceWithRelation[]>
  return response
}

export const createRace = async (race: Base_Race) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const res = await fetch(`${baseUrl}/api/race/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(race) });
  const response = await res.json() as API_RESPONSE<number[]>;
  return response;
}

export const updateRace = async (race: Base_Race) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const res = await fetch(`${baseUrl}/api/race/update`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(race) });
  const response = await res.json() as API_RESPONSE<number>;
  return response;
}

export const deleteRace = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const res = await fetch(`${baseUrl}/api/race/delete`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
  const response = await res.json() as API_RESPONSE<number>;
  return response;
}