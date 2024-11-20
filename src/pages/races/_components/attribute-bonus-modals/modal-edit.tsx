import { Dispatch, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/spinner";
import { useGetAllSubRaces } from "@/hooks/race/use-sub-race";
import { RaceAttributeBonusTable, Join_SubRace_Attribute } from "@/types/tables/race";
import { useUpdateAttributeBonus } from "@/hooks/race/use-race-attribute-bonus";
import { useGetAllAttributes } from "@/hooks/attribute/use-attribute";

export function ModalEdit({ row, setShow, refetch }: { row: Join_SubRace_Attribute | null, setShow: Dispatch<boolean>, refetch: () => void }) {
  const { data: dataSubRaces } = useGetAllSubRaces()
  const { data: dataAttributes, isLoading } = useGetAllAttributes()

  const [bonus, setBonus] = useState<number>( row?.bonus || 0 )
  const [subRaceRelation, setSubRaceRelation] = useState<number>(row?.sub_race_id || 0)
  const [attributeRelation, setAttributeRelation] = useState<number>(row?.attribute_id || 0)

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (bonus && subRaceRelation && attributeRelation) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [bonus, subRaceRelation, attributeRelation])

  const udpadeAttributeBonus = useMutation({
    mutationKey: ['udpadeAttributeBonus'],
    mutationFn: useUpdateAttributeBonus,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!row) return;

    const newItem: RaceAttributeBonusTable = {
      id: row.id,
      is_deleted: false,
      created_at: '',
      updated_at: '',
      bonus: bonus!,
      sub_race_id: subRaceRelation,
      attribute_id: attributeRelation,
    }

    udpadeAttributeBonus.mutate({ attributeBonus: newItem })
  }

  if (isLoading) return <Spinner />

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Editar Bonus</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="bonus">Bonus</label>
              <Input id="bonus" type="number" max={5} min={-5} className="w-80" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="subRaceRelation">Sub-raza</label>
              <Select value={subRaceRelation.toString()} onValueChange={(e) => setSubRaceRelation(Number(e))}>
                <SelectTrigger className="w-80">
                  <SelectValue id='subRaceRelation' placeholder="Seleccione una sub-raza" />
                </SelectTrigger>
                <SelectContent>
                  {dataSubRaces && dataSubRaces.response && dataSubRaces.response.map(subRace => (
                    <SelectItem key={subRace.id} value={subRace.id.toString()}>{subRace.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="skillRelation">Atributo</label>
              <Select value={attributeRelation.toString()} onValueChange={(e) => setAttributeRelation(Number(e))}>
                <SelectTrigger className="w-80">
                  <SelectValue id='skillRelation' placeholder="Seleccione un atributo" />
                </SelectTrigger>
                <SelectContent>
                  {dataAttributes && dataAttributes.response && dataAttributes.response.map(attribute => (
                    <SelectItem key={attribute.id} value={attribute.id.toString()}>{attribute.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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