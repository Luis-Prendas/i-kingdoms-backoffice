import { Dispatch, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllRaces } from "@/hooks/use-race";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/spinner";
import { DB_SubRace, DB_SubRaceJoinRace } from "@/types/tables/race/sub-race/sub-race";
import { useUpdateSubRace } from "@/hooks/use-sub-race";

export function ModalEdit({ row, setShow, refetch }: { row: DB_SubRaceJoinRace | null, setShow: Dispatch<boolean>, refetch: () => void }) {
  const { data, isLoading } = useGetAllRaces()

  const [subRaceName, setSubRaceName] = useState<string>(row?.sub_race_name || "")
  const [description, setDescription] = useState<string>(row?.description || "")
  const [raceRelation, setRaceRelation] = useState<number>(row?.race_id || 0)

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (subRaceName && description && raceRelation) { 
      setSave(true)
    } else {
      setSave(false)
    }
  }, [subRaceName, description, raceRelation])

  const updateSubRace = useMutation({
    mutationKey: ['updateSubRace'],
    mutationFn: useUpdateSubRace,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!row) return;

    const newItem: DB_SubRace = {
      id: row.id,
      is_deleted: false,
      created_at: '',
      updated_at: '',
      sub_race_name: subRaceName,
      description: description,
      race_id: raceRelation,
    }

    updateSubRace.mutate({ subRace: newItem })
  }

  if (isLoading) return <Spinner />

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Crear Sub-raza</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="subRaceName">Nombre de la sub-raza</label>
              <Input id="subRaceName" type="text" className="w-80" value={subRaceName} onChange={(e) => setSubRaceName(e.target.value)} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="raceRelation">Raza de origen</label>
              <Select value={raceRelation.toString()} onValueChange={(e) => setRaceRelation(Number(e))}>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Seleccione un atributo" />
                </SelectTrigger>
                <SelectContent>
                  {data && data.response && data.response.map(race => (
                    <SelectItem key={race.id} value={race.id.toString()}>{race.race_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="subRaceDescription">Descripción</label>
              <Textarea id="subRaceDescription" className="w-80" value={description} onChange={(e) => setDescription(e.target.value)} />
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