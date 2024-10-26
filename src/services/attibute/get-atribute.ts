export const getAllAtributes = async () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute/all`)
  const response = await res.json()

  return response
}

export const createAttribute = async (attribute: Attribute) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attribute),
  })

  const response = await res.json()

  return response
}

export const editAttribute = async (attribute: Attribute) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const res = await fetch(`${baseUrl}/api/attribute/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attribute),
  })

  const response = await res.json()

  return response
}