import { Dispatch, useEffect, useState } from "react";
import { useCreateAttribute } from "@/hooks/attribute/use-attribute";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Attribute } from "@/types/tables/attribute/base";

export function ModalCreate({ setShow, refetch }: { setShow: Dispatch<boolean>, refetch: () => void }) {
  const [attributeName, setAttributeName] = useState<string>("")
  const [shortName, setShortName] = useState<string>("")

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (attributeName && shortName) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [shortName, attributeName])

  const handleChangeAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributeName(e.target.value)
    const nameShort = e.target.value.slice(0, 3)
    setShortName(nameShort)
  }

  const createAttribute = useMutation({
    mutationKey: ['createAttribute'],
    mutationFn: useCreateAttribute,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: Attribute = {
      name: attributeName,
      short_name: shortName,
      description: "",
    }
    
    createAttribute.mutate({ attribute: newItem })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Crear Atributo</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="nameAttribute">Nombre de la habilidad</label>
              <Input className="w-80" value={attributeName} onChange={handleChangeAttribute} id="nameAttribute" type="text" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="shortAttributeName">Abreviatura</label>
              <Input className="w-80" value={shortName} onChange={(e) => setShortName(e.target.value)} id="shortAttributeName" type="text" />
            </div>
          </main>
          <Separator />
          <footer className="w-full flex gap-2 justify-end items-end">
            <Button disabled={!save} type="submit" variant='defaultOutline' size='sm'>Guardar</Button>
            <Button type="button" onClick={() => setShow(false)} variant='destructiveOutline' size='sm'>Cancelar</Button>
          </footer>
        </div>
      </form>
    </div>
  )
}