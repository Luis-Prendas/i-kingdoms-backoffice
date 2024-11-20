import { getAllAttributeBonusJoinSubRaceAttribute, createAttributeBonus, updateAttributeBonus, deleteAttributeBonus } from "@/services/race/attibute-bonus/attibute-bonus"
import { API_RESPONSE } from "@/types/api"
import { RaceAttributeBonusTable, Join_SubRace_Attribute } from "@/types/tables/race"
import { RaceAttributeBonus } from "@/types/tables/race/base"
import { useQuery } from "@tanstack/react-query"

export const useGetAllAttributeBonusJoinSubRaceAttribute = () => {
    const fetchData = async () => {
        const res = await getAllAttributeBonusJoinSubRaceAttribute()
        return res
    }

    return useQuery<API_RESPONSE<Join_SubRace_Attribute[]>, Error>({
        queryKey: ['useGetAllAttributeBonusJoinSubRaceAttribute'],
        queryFn: fetchData,
        refetchOnWindowFocus: true,
        retry: false,
    })
}

export const useCreateAttributeBonus = async ({ attributeBonus }: { attributeBonus: RaceAttributeBonus }) => {
    const res = await createAttributeBonus(attributeBonus)
    return res
}

export const useUpdateAttributeBonus = async ({ attributeBonus }: { attributeBonus: RaceAttributeBonusTable }) => {
    const res = await updateAttributeBonus(attributeBonus)
    return res
}

export const useDeleteAttributeBonus = async ({ id }: { id: number }) => {
    const res = await deleteAttributeBonus(id)
    return res
}