import { API_RESPONSE } from "@/types/api"
import { ClassAttributeBonusTable, Join_Attribute_SubClass } from "@/types/tables/class"
import { ClassAttributeBonus } from "@/types/tables/class/base"

export const getAllAttriBonusJoinSubClassAttribute = async (): Promise<API_RESPONSE<Join_Attribute_SubClass[]>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-attribute-bonus/join_attribute_subClass`)
  const response = await res.json() as API_RESPONSE<Join_Attribute_SubClass[]>
  return response
}

export const createClassAttriBonus = async (attriBonus: ClassAttributeBonus): Promise<API_RESPONSE<ClassAttributeBonusTable>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-attribute-bonus/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attriBonus),
  })
  const response = await res.json() as API_RESPONSE<ClassAttributeBonusTable>
  return response
}

export const updateClassAttriBonus = async (attriBonus: ClassAttributeBonusTable): Promise<API_RESPONSE<ClassAttributeBonusTable>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-attribute-bonus/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attriBonus),
  })
  const response = await res.json() as API_RESPONSE<ClassAttributeBonusTable>
  return response
}

export const deleteClassAttriBonus = async (id: number): Promise<API_RESPONSE<ClassAttributeBonusTable>> => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class-attribute-bonus/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const response = await res.json() as API_RESPONSE<ClassAttributeBonusTable>
  return response
}