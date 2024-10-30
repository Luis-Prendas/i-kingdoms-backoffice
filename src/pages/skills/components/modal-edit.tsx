import { Dispatch, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetAllAttributes } from "@/hooks/use-attribute";
import { DB_Skill, DB_SkillWithRelation } from "@/types/tables/skill/skill";
import { Spinner } from "@/components/spinner";
import { useEditSkill } from "@/hooks/use-skill";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";

export function ModalEdit({ row, setShow, refetch }: { row: DB_SkillWithRelation | null, setShow: Dispatch<boolean>, refetch: () => void }) {
  const { data, isLoading } = useGetAllAttributes()

  const [skillName, setSkillName] = useState<string>(row?.skill_name || "")
  const [shortName, setShortName] = useState<string>(row?.short_name || "")
  const [attributeRelation, setAttributeRelation] = useState<number>(row?.attribute_id || 0)

  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    if (skillName && shortName && attributeRelation) {
      setSave(true)
    } else {
      setSave(false)
    }
  }, [attributeRelation, shortName, skillName])

  const handleChangeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value)
    const nameShort = e.target.value.slice(0, 3)
    setShortName(nameShort)
  }

  const updateSkill = useMutation({
    mutationKey: ['updateSkill'],
    mutationFn: useEditSkill,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!row) return;

    const newItem: DB_Skill = {
      id: row.skill_id,
      is_deleted: false,
      created_at: '',
      updated_at: '',
      skill_name: skillName,
      short_name: shortName,
      attribute_id: attributeRelation,
    }
    updateSkill.mutate({ skill: newItem })
  }

  if (isLoading) return <Spinner />

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Editar Habilidad</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col justify-center items-center p-2">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="skillName">Nombre de la habilidad</label>
              <Input className="w-80" value={skillName} onChange={handleChangeSkill} id="skillName" type="text" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="shortSkillName">Abreviatura</label>
              <Input className="w-80" value={shortName} onChange={(e) => setShortName(e.target.value)} id="shortSkillName" type="text" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="attributeRelation">Atributo relacionado</label>
              <Select value={attributeRelation.toString()} onValueChange={(e) => setAttributeRelation(Number(e))}>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Seleccione un atributo" />
                </SelectTrigger>
                <SelectContent>
                  {data && data.response && data.response.map(attribute => (
                    <SelectItem key={attribute.id} value={attribute.id.toString()}>{attribute.attribute_name}</SelectItem>
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