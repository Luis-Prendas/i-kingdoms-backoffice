import { Spinner } from "@/components/spinner"
import { useGetAllSkillsWithRelation } from "@/hooks/use-skill"
import { DB_SkillJoinAttribute } from "@/types/tables/skill/skill"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel
} from "@tanstack/react-table"
import { useState } from "react"
import { ModalCreate } from "../components/modal-create"
import { ModalDelete } from "../components/modal-delete"
import { ModalEdit } from "../components/modal-edit"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableColumnHeader } from "@/components/ui/data-table-colum-header"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetAllAttributes } from "@/hooks/use-attribute"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom"

export function SkillList() {
  const { data: dataAttributes } = useGetAllAttributes()
  const { data, isLoading, refetch } = useGetAllSkillsWithRelation()

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: "Habilidad", value: search ?? '' }])

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  const [rowSelected, setRowSelected] = useState<DB_SkillJoinAttribute | null>(null)

  const handleEdit = (row: DB_SkillJoinAttribute) => {
    setRowSelected(row)
    setModalEdit(true)
  }

  const handleDelete = (row: DB_SkillJoinAttribute) => {
    setRowSelected(row)
    setModalDelete(true)
  }

  const columns: ColumnDef<DB_SkillJoinAttribute>[] = [
    {
      accessorKey: 'skill_name',
      id: 'Habilidad',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Habilidad" />,
    },
    {
      accessorKey: 'short_name',
      id: 'Abreviatura',
      header: 'Abreviatura',
    },
    {
      accessorKey: 'attribute_name',
      id: 'Atributo',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Atributo" />,
      cell: ({ row }) => (
        <Link to={`/attributes/attribute-list?search=${row.original.attribute_name}`} className="text-yellow-800 bg-yellow-100 p-1 rounded border border-yellow-500">{row.original.attribute_name}</Link>
      )
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
          <Input placeholder="Filtrar por nombre..." value={(table.getColumn("Habilidad")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("Habilidad")?.setFilterValue(event.target.value)} className="max-w-sm" />
          <Select value={(table.getColumn("Atributo")?.getFilterValue() as string) ?? ""} onValueChange={(e) => table.getColumn("Atributo")?.setFilterValue(e)}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filtrar por atributo..." />
            </SelectTrigger>
            <SelectContent>
              {dataAttributes && dataAttributes.response && dataAttributes.response.map(attribute => (
                <SelectItem key={attribute.id} value={attribute.attribute_name}>{attribute.attribute_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => table.resetColumnFilters()} variant='outline' >Limpiar filtros</Button>
        </div>
        <div className="w-full flex gap-2 justify-end items-center">
          <Button onClick={() => setModalCreate(true)} variant='outline'><PlusIcon /> Crear nueva habilidad</Button>
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