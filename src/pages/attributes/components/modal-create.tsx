import { Dispatch, useEffect, useState } from "react";
import { createAttribute } from "../../../services/attibute/get-atribute";
import { useNavigate } from "react-router";

export function ModalCreate({ setShow }: { setShow: Dispatch<boolean> }) {
  const navigate = useNavigate();

  const [nameAttribute, setNameAttribute] = useState<string>("")
  const [nameUpper, setNameUpper] = useState<string>("")
  const [nameShort, setNameShort] = useState<string>("")
  const [nameShortUpper, setNameShortUpper] = useState<string>("")

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (nameAttribute) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [nameAttribute])

  const handleChangeAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameAttribute(e.target.value)

    const nameUpper = e.target.value.toUpperCase()
    const nameShort = e.target.value.slice(0, 3)
    const nameShortUpper = nameShort.toUpperCase()

    setNameUpper(nameUpper)
    setNameShort(nameShort)
    setNameShortUpper(nameShortUpper)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const attribute: Attribute = {
      id: '',
      created_at: '',
      updated_at: '',
      attri_name: nameAttribute,
      up_attri_name: nameUpper,
      min_attri_name: nameShort,
      up_min_attri_name: nameShortUpper,
    }

    createAttribute(attribute).then(() => {
      setShow(false)
      navigate(0);
    })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="w-[600px] bg-zinc-100">
          <header className="w-full flex justify-between items-center p-2 border-b">
            <h1 className="text-xl">Crear Atributo</h1>
            <div>
              <button onClick={() => setShow(false)} className="bg-red-300 text-red-900 px-4 py-2 rounded flex justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </header>
          <main className="w-full h-full flex flex-col gap-2 justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="nameAttribute">Nombre del atributo</label>
              <input value={nameAttribute} onChange={handleChangeAttribute} id="nameAttribute" type="text" className="border p-1 rounded bg-zinc-50" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="nameUpper">Mayúsculas</label>
              <input value={nameUpper} onChange={(e) => setNameUpper(e.target.value)} id="nameUpper" type="text" readOnly className="border p-1 rounded bg-zinc-50" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="nameShort">Abreviatura</label>
              <input value={nameShort} onChange={(e) => setNameShort(e.target.value)} id="nameShort" type="text" readOnly className="border p-1 rounded bg-zinc-50" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="nameShortUpper">Abreviatura Mayúsculas</label>
              <input value={nameShortUpper} onChange={(e) => setNameShortUpper(e.target.value)} id="nameShortUpper" type="text" readOnly className="border p-1 rounded bg-zinc-50" />
            </div>
          </main>
          <footer className="w-full flex gap-2 justify-end items-end p-2 border-t">
            <button disabled={!save} type="submit" className="bg-blue-400 text-blue-950 px-4 py-2 rounded flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">Guardar</button>
            <button type="button" onClick={() => setShow(false)} className="bg-red-300 text-red-900 px-4 py-2 rounded flex justify-center items-center gap-2">Cancelar</button>
          </footer>
        </div>
      </form>
    </div>
  )
}