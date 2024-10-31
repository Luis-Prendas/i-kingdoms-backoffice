import { createClass, deleteClass, getAllClasses, updateClass, getClassById } from "@/services/class/get-class"
import { API_RESPONSE } from "@/types/api"
import { DB_Class, Base_Class } from "@/types/tables/class/class"
import { useQuery } from "@tanstack/react-query"

export const useGetAllClasses = () => {
  const fetchData = async () => {
    const res = await getAllClasses()
    return res
  }

  return useQuery<API_RESPONSE<DB_Class[]>, Error>({
    queryKey: ['useGetAllClasses'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useGetClassById = ({ id }: { id: number }) => {
  const fetchData = async () => {
    const res = await getClassById(id)
    return res
  }

  return useQuery<API_RESPONSE<DB_Class>, Error>({
    queryKey: ['useGetClassById'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateClass = async ({ class: newClass }: { class: Base_Class }) => {
  const res = await createClass(newClass)
  return res
}

export const useUpdateClass = async ({ class: classToUpdate }: { class: DB_Class }) => {
  const res = await updateClass(classToUpdate)
  return res
}

export const useDeleteClass = async ({ id }: { id: number }) => {
  const res = await deleteClass(id)
  return res
}