import { createSubClass, deleteSubClass, getAllSubClasses, getAllSubClassesJoinClass, updateSubClass } from "@/services/class/sub-classes/sub-classes"
import { API_RESPONSE } from "@/types/api"
import { SubClassTable, Join_Class } from "@/types/tables/class"
import { SubClass } from "@/types/tables/class/base"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSubClasses = () => {
  const fetchData = async () => {
    const res = await getAllSubClasses()
    return res
  }

  return useQuery<API_RESPONSE<SubClassTable[]>, Error>({
    queryKey: ['useGetAllSubClasses'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useGetAllSubClassesJoinClass = () => {
  const fetchData = async () => {
    const res = await getAllSubClassesJoinClass()
    return res
  }

  return useQuery<API_RESPONSE<Join_Class[]>, Error>({
    queryKey: ['useGetAllSubClassesJoinClass'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateSubClass = async ({ subClass }: { subClass: SubClass }) => {
  const res = await createSubClass(subClass)
  return res
}

export const useUpdateSubClass = async ({ subClass }: { subClass: SubClassTable }) => {
  const res = await updateSubClass(subClass)
  return res
}

export const useDeleteSubClass = async ({ id }: { id: number }) => {
  const res = await deleteSubClass(id)
  return res
}