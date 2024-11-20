import { Dispatch, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/spinner";
import { useGetAllSubRaces } from "@/hooks/race/use-sub-race";
import { useGetAllSkills } from "@/hooks/skill/use-skill";
import { Join_SubRace_Skill, RaceSkillBonusTable } from "@/types/tables/race";
import { useUpdateSkillBonus } from "@/hooks/race/use-race-skill-bonus";

export function ModalEdit({ row, setShow, refetch }: { row: Join_SubRace_Skill | null, setShow: Dispatch<boolean>, refetch: () => void }) {
  const { data: dataSubRaces } = useGetAllSubRaces()
  const { data: dataSkills, isLoading } = useGetAllSkills()

  const [bonus, setBonus] = useState<number>( row?.bonus || 0 )
  const [subRaceRelation, setSubRaceRelation] = useState<number>(row?.sub_race_id || 0)
  const [skillRelation, setSkillRelation] = useState<number>(row?.skill_id || 0)

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (bonus && subRaceRelation && skillRelation) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [bonus, subRaceRelation, skillRelation])

  const udpadeSkillBonus = useMutation({
    mutationKey: ['udpadeSkillBonus'],
    mutationFn: useUpdateSkillBonus,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!row) return;

    const newItem: RaceSkillBonusTable = {
      id: row.id,
      is_deleted: false,
      created_at: '',
      updated_at: '',
      bonus: bonus!,
      sub_race_id: subRaceRelation,
      skill_id: skillRelation,
    }

    udpadeSkillBonus.mutate({ skillBonus: newItem })
  }

  if (isLoading) return <Spinner />

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Crear Bonus</h1>
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
              <label htmlFor="skillRelation">Habilidad</label>
              <Select value={skillRelation.toString()} onValueChange={(e) => setSkillRelation(Number(e))}>
                <SelectTrigger className="w-80">
                  <SelectValue id='skillRelation' placeholder="Seleccione una habilidad" />
                </SelectTrigger>
                <SelectContent>
                  {dataSkills && dataSkills.response && dataSkills.response.map(skill => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>{skill.name}</SelectItem>
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