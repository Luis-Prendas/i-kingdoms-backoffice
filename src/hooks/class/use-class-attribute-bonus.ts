import { createClassAttriBonus, deleteClassAttriBonus, getAllAttriBonusJoinSubClassAttribute, updateClassAttriBonus } from "@/services/class/attribute-bonus/attribute-bonus"
import { API_RESPONSE } from "@/types/api"
import { ClassAttributeBonusTable, Join_Attribute_SubClass } from "@/types/tables/class"
import { ClassAttributeBonus } from "@/types/tables/class/base"
import { useQuery } from "@tanstack/react-query"

export const useAllClassAttriBonusJoinSubClassAttribute = () => {
  const fetchData = async () => {
    const res = await getAllAttriBonusJoinSubClassAttribute()
    return res
  }

  return useQuery<API_RESPONSE<Join_Attribute_SubClass[]>, Error>({
    queryKey: ['useGetAllAttriBonusJoinSubClassAttribute'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateClassAttriBonus = async ({ attributeBonus }: { attributeBonus: ClassAttributeBonus }) => {
  const res = await createClassAttriBonus(attributeBonus)
  return res
}

export const useUpdateClassAttriBonus = async ({ attributeBonus }: { attributeBonus: ClassAttributeBonusTable }) => {
  const res = await updateClassAttriBonus(attributeBonus)
  return res
}

export const useDeleteClassAttriBonus = async ({ id }: { id: number }) => {
  const res = await deleteClassAttriBonus(id)
  return res
}