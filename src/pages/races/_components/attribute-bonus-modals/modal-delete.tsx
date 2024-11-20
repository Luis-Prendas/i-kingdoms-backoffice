import { useMutation } from "@tanstack/react-query";
import { Dispatch } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDeleteAttributeBonus } from "@/hooks/race/use-race-attribute-bonus";
import { Join_SubRace_Attribute } from "@/types/tables/race";

export function ModalDelete({ row, setShow, refetch }: { row: Join_SubRace_Attribute | null, setShow: Dispatch<boolean>, refetch: () => void }) {
  const deleteAttributeBonus = useMutation({
    mutationKey: ['deleteAttributeBonus'],
    mutationFn: useDeleteAttributeBonus,
    onSuccess: () => {
      setShow(false)
      refetch()
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!row) return;
    deleteAttributeBonus.mutate({ id: row.id })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/20 backdrop-blur absolute top-0 left-0 text-zinc-700">
      <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
        <div className="min-w-[400px] flex flex-col justify-center items-center gap-2 bg-card rounded border p-2">
          <header className="w-full flex justify-between items-center">
            <h1 className="text-xl">Eliminar Bonus</h1>
            <Button onClick={() => setShow(false)} variant='destructiveOutline' size='sm' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Button>
          </header>
          <Separator />
          <main className="w-full h-full flex flex-col gap-2 justify-center items-center p-2">
            <p className="text-yellow-800 bg-yellow-100 p-4 rounded border border-yellow-500 text-xl">Esta acción no se puede deshacer. ¿Estás seguro?</p>
          </main>
          <Separator />
          <footer className="w-full flex gap-2 justify-end items-end">
            <Button type="submit" variant='defaultOutline' size='sm'>Eliminar</Button>
            <Button type="button" onClick={() => setShow(false)} variant='destructiveOutline' size='sm'>Cancelar</Button>
          </footer>
        </div>
      </form>
    </div>
  )
}