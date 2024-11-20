import { createAttribute, deleteAttribute, editAttribute, getAllAtributes } from "../services/attribute/get-attribute"
import { AttributeTable } from "@/types/tables/attribute"
import { Attribute } from "@/types/tables/attribute/base"
import { API_RESPONSE } from "@/types/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllAttributes = () => {
  const fetchData = async () => {
    const res = await getAllAtributes()
    return res
  }

  return useQuery<API_RESPONSE<AttributeTable[]>, Error>({
    queryKey: ['useGetAllAttributes'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateAttribute = async ({ attribute }: { attribute: Attribute }) => {
  const res = await createAttribute(attribute)
  return res
}

export const useEditAttribute = async ({ attribute }: { attribute: AttributeTable }) => {
  const res = await editAttribute(attribute)
  return res
}

export const useDeleteAttribute = async ({ id }: { id: number }) => {
  const res = await deleteAttribute(id)
  return res
}