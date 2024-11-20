import { createClass, deleteClass, getAllClasses, updateClass, getClassById } from "@/services/class/get-class"
import { API_RESPONSE } from "@/types/api"
import { ClassTable } from "@/types/tables/class"
import { Class } from "@/types/tables/class/base"
import { useQuery } from "@tanstack/react-query"

export const useGetAllClasses = () => {
  const fetchData = async () => {
    const res = await getAllClasses()
    return res
  }

  return useQuery<API_RESPONSE<ClassTable[]>, Error>({
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

  return useQuery<API_RESPONSE<ClassTable>, Error>({
    queryKey: ['useGetClassById'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    retry: false,
  })
}

export const useCreateClass = async ({ class: newClass }: { class: Class }) => {
  const res = await createClass(newClass)
  return res
}

export const useUpdateClass = async ({ class: classToUpdate }: { class: ClassTable }) => {
  const res = await updateClass(classToUpdate)
  return res
}

export const useDeleteClass = async ({ id }: { id: number }) => {
  const res = await deleteClass(id)
  return res
}