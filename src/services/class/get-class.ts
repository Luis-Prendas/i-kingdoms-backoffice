import { API_RESPONSE } from "@/types/api"
import { ClassTable } from "@/types/tables/class"
import { Class } from "@/types/tables/class/base"

export const getAllClasses = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  const res = await fetch(`${baseUrl}/api/class`)
  const response = await res.json() as API_RESPONSE<ClassTable[]>
  return response
}

export const getClassById = async (id: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const res = await fetch(`${baseUrl}/api/class/id/${id}`);
  const response = await res.json() as API_RESPONSE<ClassTable>;
  return response;
};

export const createClass = async (newClass: Class) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    const res = await fetch(`${baseUrl}/api/class/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newClass) });
    const response = await res.json() as API_RESPONSE<number[]>;
    return response;
}

export const updateClass = async (classToUpdate: Class) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    const res = await fetch(`${baseUrl}/api/class/update`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(classToUpdate) });
    const response = await res.json() as API_RESPONSE<number>;
    return response;
}

export const deleteClass = async (id: number) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    const res = await fetch(`${baseUrl}/api/class/delete`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const response = await res.json() as API_RESPONSE<number>;
    return response;
}