import { API_RESPONSE } from "@/types/api"
import { Join_Attribute, SkillTable } from "@/types/tables/skill"
import { Skill } from "@/types/tables/skill/base"

export const getAllSkills = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/skill`)
  const response = await res.json() as API_RESPONSE<SkillTable[]>

  return response
}

export const createSkill = async (skill: Skill) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/skill/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skill),
  })

  const response = await res.json() as API_RESPONSE<number[]>

  return response
}

export const editSkill = async (skill: Skill) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/skill/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skill),
  })

  const response = await res.json() as API_RESPONSE<number>

  return response
}

export const deleteSkill = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/skill/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  const response = await res.json() as API_RESPONSE<number>

  return response
}

export const getAllSkillsWithRelation = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/skill/join_attribute`)
  const response = await res.json() as API_RESPONSE<Join_Attribute[]>
  return response
}