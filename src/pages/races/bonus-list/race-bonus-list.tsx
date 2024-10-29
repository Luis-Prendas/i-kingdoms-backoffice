import { useState } from "react"
import { Spinner } from "../../../components/spinner"
import { useGetAllRaceBonus } from "../../../hooks/use-race"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ModalCreate } from "./components/modal-create"

export function RaceBonusList() {
  const { bonus } = useGetAllRaceBonus()

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)

  const [rowSelected, setRowSelected] = useState<GetAllRaceBonus | null>(null)

  const handleEdit = (row: GetAllRaceBonus) => {
    setRowSelected(row)
    setModalEdit(true)
  }

  const columns: ColumnDef<GetAllRaceBonus>[] = [
    {
      accessorKey: 'subRace.sub_race_name',
      header: 'Sub-raza',
    },
    {
      accessorKey: 'attribute.attri_name',
      header: 'Atributo',
    },
    {
      header: 'Bonus',
      cell: ({ row }) => <span>{row.original.bonus >= 0 ? `+${row.original.bonus}` : row.original.bonus}</span>,
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleEdit(row.original)} className="bg-blue-400 text-blue-950 px-4 py-2 rounded flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </button>
          <button className="bg-red-400 text-red-900 px-4 py-2 rounded flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: bonus || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (!bonus) {
    return <Spinner />
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-4">
      <table className="text-sm text-center border border-zinc-400 text-zinc-700 bg-white">
        <thead className="text-xs text-gray-700 uppercase border-b border-zinc-400">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} scope="col" className="px-6 py-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} className={`${rowIndex % 2 === 0 && 'bg-zinc-200'}`}>
              {row.getVisibleCells().map((cell, cellIndex) => (
                <td key={cell.id} className={`px-6 py-4 ${cellIndex === 0 && 'font-bold'}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setModalCreate(true)} className="bg-blue-400 text-blue-950 px-4 py-2 rounded flex justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
      </button>

      {modalCreate && <ModalCreate setShow={setModalCreate} />}
      {/* {modalEdit && <ModalEdit row={rowSelected} setShow={setModalEdit} />} */}
    </div>
  )
}