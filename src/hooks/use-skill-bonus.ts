import { createSkillBonus, deleteSkillBonus, getAllSkillBonusJoinSubRaceSkill, updateSkillBonus } from "@/services/race/skill-bonus/skill-bonus"
import { API_RESPONSE } from "@/types/api"
import { DB_RaceSkillBonus, DB_RaceSkillBonusJoinSubRaceSkill, RaceSkillBonus } from "@/types/tables/race/race-skill-bonus/race-skill-bonus"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSkillBonusJoinSubRaceSkill = () => {
    const fetchData = async () => {
        const res = await getAllSkillBonusJoinSubRaceSkill()
        return res
    }

    return useQuery<API_RESPONSE<DB_RaceSkillBonusJoinSubRaceSkill[]>, Error>({
        queryKey: ['useGetAllSkillBonusJoinSubRaceSkill'],
        queryFn: fetchData,
        refetchOnWindowFocus: true,
        retry: false,
    })
}

export const useCreateSkillBonus = async ({ skillBonus }: { skillBonus: RaceSkillBonus }) => {
    const res = await createSkillBonus(skillBonus)
    return res
}

export const useUpdateSkillBonus = async ({ skillBonus }: { skillBonus: DB_RaceSkillBonus }) => {
    const res = await updateSkillBonus(skillBonus)
    return res
}

export const useDeleteSkillBonus = async ({ id }: { id: number }) => {
    const res = await deleteSkillBonus(id)
    return res
}