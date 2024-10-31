import { API_RESPONSE } from "@/types/api"
import { DB_RaceSkillBonusJoinSubRaceSkill, RaceSkillBonus, DB_RaceSkillBonus } from "@/types/tables/race/race-skill-bonus/race-skill-bonus"

export const getAllSkillBonusJoinSubRaceSkill = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/skill-bonus/join-subrace-skill`)
  const response = await res.json() as API_RESPONSE<DB_RaceSkillBonusJoinSubRaceSkill[]>
  return response
}

export const createSkillBonus = async (skillBonus: RaceSkillBonus) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/skill-bonus/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skillBonus),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}

export const updateSkillBonus = async (skillBonus: DB_RaceSkillBonus) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/skill-bonus/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skillBonus),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}

export const deleteSkillBonus = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/race/skill-bonus/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  const response = await res.json() as API_RESPONSE<number>
  return response
}