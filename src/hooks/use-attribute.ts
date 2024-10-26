import { useEffect, useState } from "react"
import { createAttribute, getAllAtributes } from "../services/attibute/get-atribute"

export const useGetAllAttributes = () => {
  const [attributes, setAttributes] = useState<Attribute[] | null>(null)

  useEffect(() => {
    getAllAtributes().then((res) => {
      setAttributes(res)
    })
  }, [])

  return { attributes }
}

export const useCreateAttribute = () => {
  const [attribute, setAttribute] = useState<Attribute | null>(null)

  useEffect(() => {
    if (attribute) {
      createAttribute(attribute).then((res) => {
        setAttribute(res)
      })
    }
  }, [attribute])

  return { attribute }
}