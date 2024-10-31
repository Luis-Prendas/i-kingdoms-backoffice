import { createSkill, deleteSkill, editSkill, getAllSkills, getAllSkillsWithRelation, getSkillById } from "@/services/skill/get-skill"
import { API_RESPONSE } from "@/types/api"
import { DB_Skill, DB_SkillJoinAttribute, Base_Skill } from "@/types/tables/skill/skill"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSkills = () => {
  const fetchData = async () => {
    const res = await getAllSkills()
    return res
  }

  return useQuery<API_RESPONSE<DB_Skill[]>, Error>({
    queryKey: ['useGetAllSkills'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useGetSkillById = ({ id }: { id: number }) => {
  const fetchData = async () => {
    const res = await getSkillById(id)
    return res
  }

  return useQuery<API_RESPONSE<DB_Skill>, Error>({
    queryKey: ['useGetSkillById'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateSkill = async ({ skill }: { skill: Base_Skill }) => {
  const res = await createSkill(skill)
  return res
}

export const useEditSkill = async ({ skill }: { skill: DB_Skill }) => {
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

  return useQuery<API_RESPONSE<DB_SkillJoinAttribute[]>, Error>({
    queryKey: ['useGetAllSkillsWithRelation'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}