import { getAllAttributeBonusJoinSubRaceAttribute, createAttributeBonus, updateAttributeBonus, deleteAttributeBonus } from "@/services/race/attibute-bonus/attibute-bonus"
import { API_RESPONSE } from "@/types/api"
import { Base_RaceAttributeBonus, DB_RaceAttributeBonus, DB_RaceAttributeBonusJoinSubRaceAttribute } from "@/types/tables/race/race-attribute-bonus/race-attribute-bonus"
import { useQuery } from "@tanstack/react-query"

export const useGetAllAttributeBonusJoinSubRaceAttribute = () => {
    const fetchData = async () => {
        const res = await getAllAttributeBonusJoinSubRaceAttribute()
        return res
    }

    return useQuery<API_RESPONSE<DB_RaceAttributeBonusJoinSubRaceAttribute[]>, Error>({
        queryKey: ['useGetAllAttributeBonusJoinSubRaceAttribute'],
        queryFn: fetchData,
        refetchOnWindowFocus: true,
        retry: false,
    })
}

export const useCreateAttributeBonus = async ({ attributeBonus }: { attributeBonus: Base_RaceAttributeBonus }) => {
    const res = await createAttributeBonus(attributeBonus)
    return res
}

export const useUpdateAttributeBonus = async ({ attributeBonus }: { attributeBonus: DB_RaceAttributeBonus }) => {
    const res = await updateAttributeBonus(attributeBonus)
    return res
}

export const useDeleteAttributeBonus = async ({ id }: { id: number }) => {
    const res = await deleteAttributeBonus(id)
    return res
}