import { createAttribute, deleteAttribute, editAttribute, getAllAtributes, getAttributeById } from "../services/attibute/get-atribute"
import { Attribute, DB_Attribute } from "@/types/tables/attribute/types"
import { API_RESPONSE } from "@/types/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllAttributes = () => {
  const fetchData = async () => {
    const res = await getAllAtributes()
    return res
  }

  return useQuery<API_RESPONSE<DB_Attribute[]>, Error>({
    queryKey: ['useGetAllAttributes'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useGetAttributeById = ({ id }: { id: number }) => {
  const fetchData = async () => {
    const res = await getAttributeById(id)
    return res
  }

  return useQuery<API_RESPONSE<DB_Attribute>, Error>({
    queryKey: ['useGetAttributeById'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateAttribute = async ({ attribute }: { attribute: Attribute }) => {
  const res = await createAttribute(attribute)
  return res
}

export const useEditAttribute = async ({ attribute }: { attribute: Attribute }) => {
  const res = await editAttribute(attribute)
  return res
}

export const useDeleteAttribute = async ({ id }: { id: number }) => {
  const res = await deleteAttribute(id)
  return res
}