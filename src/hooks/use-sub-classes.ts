import { createSubClass, deleteSubClass, getAllSubClasses, getAllSubClassesJoinClass, updateSubClass } from "@/services/class/sub-classes/sub-classes"
import { API_RESPONSE } from "@/types/api"
import { DB_SubClass, DB_SubClassJoinClass, Base_SubClass } from "@/types/tables/class/sub-class/sub-class"
import { useQuery } from "@tanstack/react-query"

export const useGetAllSubClasses = () => {
  const fetchData = async () => {
    const res = await getAllSubClasses()
    return res
  }

  return useQuery<API_RESPONSE<DB_SubClass[]>, Error>({
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

  return useQuery<API_RESPONSE<DB_SubClassJoinClass[]>, Error>({
    queryKey: ['useGetAllSubClassesJoinClass'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateSubClass = async ({ subClass }: { subClass: Base_SubClass }) => {
  const res = await createSubClass(subClass)
  return res
}

export const useUpdateSubClass = async ({ subClass }: { subClass: Base_SubClass }) => {
  const res = await updateSubClass(subClass)
  return res
}

export const useDeleteSubClass = async ({ id }: { id: number }) => {
  const res = await deleteSubClass(id)
  return res
}