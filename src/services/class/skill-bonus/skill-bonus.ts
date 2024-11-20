import { API_RESPONSE } from "@/types/api"
import { ClassSkillBonusTable, Join_Skill_SubClass } from "@/types/tables/class"
import { ClassSkillBonus } from "@/types/tables/class/base"

export const getAllSkillBonusJoinSubClassSkill = async (): Promise<API_RESPONSE<Join_Skill_SubClass[]>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-skill-bonus/join_skill_subClass`)
  const response = await res.json() as API_RESPONSE<Join_Skill_SubClass[]>
  return response
}

export const createClassSkillBonus = async (skillBonus: ClassSkillBonus): Promise<API_RESPONSE<ClassSkillBonusTable>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-skill-bonus/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillBonus),
  })
  const response = await res.json() as API_RESPONSE<ClassSkillBonusTable>
  return response
}

export const updateClassSkillBonus = async (skillBonus: ClassSkillBonusTable): Promise<API_RESPONSE<ClassSkillBonusTable>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-skill-bonus/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillBonus),
  })
  const response = await res.json() as API_RESPONSE<ClassSkillBonusTable>
  return response
}

export const deleteClassSkillBonus = async (id: number): Promise<API_RESPONSE<ClassSkillBonusTable>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-skill-bonus/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const response = await res.json() as API_RESPONSE<ClassSkillBonusTable>
  return response
}