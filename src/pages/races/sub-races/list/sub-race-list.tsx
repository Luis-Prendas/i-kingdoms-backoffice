import { Spinner } from "@/components/spinner"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableColumnHeader } from "@/components/ui/data-table-colum-header"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Input } from "@/components/ui/input"
import { ModalCreate } from "./components/modal-create"
import { ModalEdit } from "./components/modal-edit"
import { ModalDelete } from "./components/modal-delete"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useGetAllSubRacesJoinRace } from "@/hooks/use-sub-race"
import { Link } from "react-router-dom"
import { DB_SubRaceJoinRace } from "@/types/tables/race/sub-race/sub-race"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllRaces } from "@/hooks/use-race"
import { useSearchParams } from "react-router-dom"

export function SubRaceList() {
  const { data: dataRaces } = useGetAllRaces()
  const { data, isLoading, refetch } = useGetAllSubRacesJoinRace()

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: "Sub-raza", value: search ?? '' }])

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  const [rowSelected, setRowSelected] = useState<DB_SubRaceJoinRace | null>(null)

  const handleEdit = (row: DB_SubRaceJoinRace) => {
    setRowSelected(row)
    setModalEdit(true)
  }

  const handleDelete = (row: DB_SubRaceJoinRace) => {
    setRowSelected(row)
    setModalDelete(true)
  }

  const columns: ColumnDef<DB_SubRaceJoinRace>[] = [
    {
      accessorKey: 'sub_race_name',
      id: 'Sub-raza',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sub-raza" />,
    },
    {
      accessorKey: 'description',
      id: 'Descripción',
      header: 'Descripción',
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-80 truncate text-left">{row.original.description}</TooltipTrigger>
            <TooltipContent>
              <p className="w-80">{row.original.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: 'race_name',
      id: 'Raza de origen',
      header: 'Raza de origen',
      cell: ({ row }) => <Link to={`/races/race-list?search=${row.original.race_name}`} className="text-yellow-800 bg-yellow-100 p-1 rounded border border-yellow-500">{row.original.race_name}</Link>,
    },
    {
      accessorKey: 'created_at',
      id: 'Fecha de creación',
      header: 'Fecha de creación',
    },
    {
      accessorKey: 'updated_at',
      id: 'Fecha de actualización',
      header: 'Fecha de actualización',
    },
    {
      id: "Acciones",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(row.original)}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.original)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: data && data.response ? data.response : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-start p-2 gap-2">
      <div className="w-full flex justify-between items-center gap-2">
        <div className="w-full flex gap-2 justify-start items-center">
          <Input placeholder="Filtrar por nombre..." value={(table.getColumn("Sub-raza")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("Sub-raza")?.setFilterValue(event.target.value)} className="max-w-sm" />
          <Select value={(table.getColumn('Raza de origen')?.getFilterValue() as string) ?? ""} onValueChange={(e) => table.getColumn('Raza de origen')?.setFilterValue(e)}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filtrar por raza..." />
            </SelectTrigger>
            <SelectContent>
              {dataRaces && dataRaces.response && dataRaces.response.map(race => (
                <SelectItem key={race.id} value={race.race_name}>{race.race_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => table.resetColumnFilters()} variant='outline' >Limpiar filtros</Button>
        </div>
        <div className="w-full flex gap-2 justify-end items-center">
          <Button onClick={() => setModalCreate(true)} variant='outline'><PlusIcon /> Crear nueva sub-raza</Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />

      {modalCreate && <ModalCreate setShow={setModalCreate} refetch={refetch} />}
      {modalEdit && <ModalEdit row={rowSelected} setShow={setModalEdit} refetch={refetch} />}
      {modalDelete && <ModalDelete row={rowSelected} setShow={setModalDelete} refetch={refetch} />}
    </div>
  )
}
