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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useGetAllSubClassesJoinClass } from "@/hooks/use-sub-classes"
import { Link } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllClasses } from "@/hooks/use-class"
import { useSearchParams } from "react-router-dom"
import { ModalCreate } from "../_components/sub-class-modals/modal-create"
import { ModalEdit } from "../_components/sub-class-modals/modal-edit"
import { ModalDelete } from "../_components/sub-class-modals/modal-delete"
import { Join_Class } from "@/types/tables/class"

export function SubClassList() {
  const { data: dataClasses } = useGetAllClasses()
  const { data, isLoading, refetch } = useGetAllSubClassesJoinClass()

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: "Sub-raza", value: search ?? '' }])

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  const [rowSelected, setRowSelected] = useState<Join_Class | null>(null)

  const handleEdit = (row: Join_Class) => {
    setRowSelected(row)
    setModalEdit(true)
  }

  const handleDelete = (row: Join_Class) => {
    setRowSelected(row)
    setModalDelete(true)
  }

  const columns: ColumnDef<Join_Class>[] = [
    {
      accessorKey: 'sub_class_name',
      id: 'Sub-clase',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sub-raza" />,
    },
    {
      accessorKey: 'required_level',
      id: 'Nivel requerido',
      header: 'Nivel requerido',
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
      accessorKey: 'class_name',
      id: 'Clase',
      header: 'Clase',
      cell: ({ row }) => <Link to={`/classes?search=${row.original.class_name}`} className="text-yellow-800 bg-yellow-100 p-1 rounded border border-yellow-500">{row.original.class_name}</Link>,
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
          <Input placeholder="Filtrar por nombre..." value={(table.getColumn("Sub-clase")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("Sub-clase")?.setFilterValue(event.target.value)} className="max-w-sm" />
          <Select value={(table.getColumn('Clase')?.getFilterValue() as string) ?? ""} onValueChange={(e) => table.getColumn('Clase')?.setFilterValue(e)}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filtrar por clase..." />
            </SelectTrigger>
            <SelectContent>
              {dataClasses && dataClasses.response && dataClasses.response.map(className => (
                <SelectItem key={className.id} value={className.name}>{className.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => table.resetColumnFilters()} variant='outline' >Limpiar filtros</Button>
        </div>
        <div className="w-full flex gap-2 justify-end items-center">
          <Button onClick={() => setModalCreate(true)} variant='outline'><PlusIcon />Crear nueva sub-clase</Button>
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