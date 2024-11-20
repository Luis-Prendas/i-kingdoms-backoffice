import { createClassSkillBonus, updateClassSkillBonus, deleteClassSkillBonus, getAllSkillBonusJoinSubClassSkill } from "@/services/class/skill-bonus/skill-bonus"
import { API_RESPONSE } from "@/types/api"
import {  ClassSkillBonusTable, Join_Skill_SubClass } from "@/types/tables/class"
import { ClassSkillBonus } from "@/types/tables/class/base"
import { useQuery } from "@tanstack/react-query"

export const useAllClassSkillBonusJoinSubClassSkill = () => {
  const fetchData = async () => {
    const res = await getAllSkillBonusJoinSubClassSkill()
    return res
  }

  return useQuery<API_RESPONSE<Join_Skill_SubClass[]>, Error>({
    queryKey: ['useAllClassSkillBonusJoinSubClassSkill'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateClassSkillBonus = async ({ skillBonus }: { skillBonus: ClassSkillBonus}) => {
  const res = await createClassSkillBonus(skillBonus)
  return res
}

export const useUpdateClassSkillBonus = async ({ skillBonus }: { skillBonus: ClassSkillBonusTable }) => {
  const res = await updateClassSkillBonus(skillBonus)
  return res
}

export const useDeleteClassSkillBonus = async ({ id }: { id: number }) => {
  const res = await deleteClassSkillBonus(id)
  return res
}