import { createSkillBonus, deleteSkillBonus, getAllSkillBonusJoinSubRaceSkill, updateSkillBonus } from "@/services/race/skill-bonus/skill-bonus"
import { API_RESPONSE } from "@/types/api"
import { RaceSkillBonusTable, Join_SubRace_Skill } from "@/types/tables/race"
import { RaceSkillBonus } from "@/types/tables/race/base"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSkillBonusJoinSubRaceSkill = () => {
    const fetchData = async () => {
        const res = await getAllSkillBonusJoinSubRaceSkill()
        return res
    }

    return useQuery<API_RESPONSE<Join_SubRace_Skill[]>, Error>({
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

export const useUpdateSkillBonus = async ({ skillBonus }: { skillBonus: RaceSkillBonusTable }) => {
    const res = await updateSkillBonus(skillBonus)
    return res
}

export const useDeleteSkillBonus = async ({ id }: { id: number }) => {
    const res = await deleteSkillBonus(id)
    return res
}