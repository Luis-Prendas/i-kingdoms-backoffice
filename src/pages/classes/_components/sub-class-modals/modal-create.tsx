import { Dispatch, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSubClass } from "@/hooks/use-sub-classes";
import { Base_SubClass } from "@/types/tables/class/sub-class/sub-class";
import { useGetAllClasses } from "@/hooks/use-class";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ModalCreate({ setShow, refetch }: { setShow: Dispatch<boolean>, refetch: () => void }) {
  const { data: dataClasses } = useGetAllClasses()

  const [subClassName, setSubClassName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [classRelation, setClassRelation] = useState<number>(0)
  const [requiredLevel, setRequiredLevel] = useState<number>(0)

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (subClassName && description && classRelation && requiredLevel) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [subClassName, description, classRelation, requiredLevel])

  const createSubClass = useMutation({
    mutationKey: ['createSubClass'],
    mutationFn: useCreateSubClass,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: Base_SubClass = {
      sub_class_name: subClassName,
      description: description,
      class_id: classRelation,
      required_level: requiredLevel,
    }

    createSubClass.mutate({ subClass: newItem })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Crear Sub-clase</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="subClassName">Nombre de la sub-clase</label>
              <Input id="subClassName" type="text" className="w-80" value={subClassName} onChange={(e) => setSubClassName(e.target.value)} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="classRelation">Clase relacionada</label>
              <Select value={classRelation.toString()} onValueChange={(e) => setClassRelation(Number(e))}>
                <SelectTrigger className="w-80">
                  <SelectValue id='classRelation' placeholder="Seleccione una clase" />
                </SelectTrigger>
                <SelectContent>
                  {dataClasses && dataClasses.response && dataClasses.response.map(className => (
                    <SelectItem key={className.id} value={className.id.toString()}>{className.class_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="requiredLevel">Nivel requerido</label>
              <Input id="requiredLevel" type="number" max={20} min={0} className="w-80" value={requiredLevel} onChange={(e) => setRequiredLevel(Number(e.target.value))} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="description">Descripción</label>
              <Textarea id="description" className="w-80" value={description} onChange={(e) => setDescription(e.target.value)} />
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