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
import { Link } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllAttributes } from "@/hooks/attribute/use-attribute"
import { useGetAllSubClasses } from "@/hooks/class/use-sub-classes"
import { Join_Skill_SubClass } from "@/types/tables/class"
import { useAllClassSkillBonusJoinSubClassSkill } from "@/hooks/class/use-class-skill-bonus"
import { ModalCreate } from "../_components/skill-bonus-modals/modal-create"
import { ModalEdit } from "../_components/skill-bonus-modals/modal-edit"
import { ModalDelete } from "../_components/skill-bonus-modals/modal-delete"

export function ClassSkillBonusList() {
  const { data: dataSubClass } = useGetAllSubClasses()
  const { data: dataAttributes } = useGetAllAttributes()
  const { data, isLoading, refetch } = useAllClassSkillBonusJoinSubClassSkill()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  const [rowSelected, setRowSelected] = useState<Join_Skill_SubClass | null>(null)

  const handleEdit = (row: Join_Skill_SubClass) => {
    setRowSelected(row)
    setModalEdit(true)
  }

  const handleDelete = (row: Join_Skill_SubClass) => {
    setRowSelected(row)
    setModalDelete(true)
  }

  const columns: ColumnDef<Join_Skill_SubClass>[] = [
    {
      accessorKey: 'bonus',
      id: 'Bunus',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Bunus" />,
      cell: ({ row }) => {
        if (row.original.bonus < 0) return <span className="text-xl font-semibold text-red-800 bg-red-100 px-2 pt-1 pb-2 rounded border border-red-500" > {row.original.bonus} </span>
        if (row.original.bonus > 0) return <span className="text-xl font-semibold text-green-800 bg-green-100 px-2 pt-1 pb-2 rounded border border-green-500" > +{row.original.bonus} </span>
        return <span>{row.original.bonus} </span>
      },
    },
    {
      accessorKey: 'skill_name',
      id: 'Habilidad',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Habilidad" />,
      cell: ({ row }) => <Link to={`/attributes?search=${row.original.skill_name}`} className="text-yellow-800 bg-yellow-100 p-1 rounded border border-yellow-500" > {row.original.skill_name} </Link>,
    },
    {
      accessorKey: 'sub_class_name',
      id: 'Sub-clase',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sub-clase" />,
      cell: ({ row }) => <Link to={`/classes/sub-class?search=${row.original.sub_class_name}`} className="text-yellow-800 bg-yellow-100 p-1 rounded border border-yellow-500" > {row.original.sub_class_name} </Link>,
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
    }
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

  if (isLoading) return <Spinner />

  return (
    <div className="w-full h-full flex flex-col justify-start items-start p-2 gap-2">
      <div className="w-full flex justify-between items-center gap-2">
        <div className="w-full flex gap-2 justify-start items-center">
          <Select value={(table.getColumn('Sub-raza')?.getFilterValue() as string) ?? ""} onValueChange={(e) => table.getColumn('Sub-raza')?.setFilterValue(e)}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filtrar por sub-raza..." />
            </SelectTrigger>
            <SelectContent>
              {dataSubClass && dataSubClass.response && dataSubClass.response.map(subClass => (
                <SelectItem key={subClass.id} value={subClass.name}>{subClass.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={(table.getColumn('Atributo')?.getFilterValue() as string) ?? ""} onValueChange={(e) => table.getColumn('Atributo')?.setFilterValue(e)}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filtrar por atributo..." />
            </SelectTrigger>
            <SelectContent>
              {dataAttributes && dataAttributes.response && dataAttributes.response.map(attribute => (
                <SelectItem key={attribute.id} value={attribute.name}>{attribute.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => table.resetColumnFilters()} variant='outline' >Limpiar filtros</Button>
        </div>
        <div className="w-full flex gap-2 justify-end items-center">
          <Button onClick={() => setModalCreate(true)} variant='outline'><PlusIcon />Crear nuevo bonus</Button>
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