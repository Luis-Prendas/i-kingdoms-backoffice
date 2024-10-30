import { Dispatch, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DB_Race } from "@/types/tables/race/race";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateRace } from "@/hooks/use-race";

export function ModalEdit({ row, setShow, refetch }: { row: DB_Race | null, setShow: Dispatch<boolean>, refetch: () => void }) {
  const [raceName, setRaceName] = useState<string>(row?.race_name || "")
  const [description, setDescription] = useState<string>(row?.description || "")

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (raceName && description) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [raceName, description])

  const updateRace = useMutation({
    mutationKey: ['updateRace'],
    mutationFn: useUpdateRace,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!row) return;

    const newItem: DB_Race = {
      id: row.id,
      is_deleted: false,
      created_at: '',
      updated_at: '',
      race_name: raceName,
      description: description,
    }

    updateRace.mutate({ race: newItem })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Editar Raza</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="raceName">Nombre de la raza</label>
              <Input id="raceName" type="text" className="w-80" value={raceName} onChange={(e) => setRaceName(e.target.value)} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="raceDescription">Descripción</label>
              <Textarea id="raceDescription" className="w-80" value={description} onChange={(e) => setDescription(e.target.value)} />
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