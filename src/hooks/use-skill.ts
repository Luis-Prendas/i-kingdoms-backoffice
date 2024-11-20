import { createSkill, deleteSkill, editSkill, getAllSkills, getAllSkillsWithRelation } from "@/services/skill/get-skill"
import { API_RESPONSE } from "@/types/api"
import { SkillTable, Join_Attribute } from "@/types/tables/skill"
import { Skill } from "@/types/tables/skill/base"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSkills = () => {
  const fetchData = async () => {
    const res = await getAllSkills()
    return res
  }

  return useQuery<API_RESPONSE<SkillTable[]>, Error>({
    queryKey: ['useGetAllSkills'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateSkill = async ({ skill }: { skill: Skill }) => {
  const res = await createSkill(skill)
  return res
}

export const useEditSkill = async ({ skill }: { skill: SkillTable }) => {
  const res = await editSkill(skill)
  return res
}

export const useDeleteSkill = async ({ id }: { id: number }) => {
  const res = await deleteSkill(id)
  return res
}

export const useGetAllSkillsWithRelation = () => {
  const fetchData = async () => {
    const res = await getAllSkillsWithRelation()
    return res
  }

  return useQuery<API_RESPONSE<Join_Attribute[]>, Error>({
    queryKey: ['useGetAllSkillsWithRelation'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}