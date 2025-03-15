"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import {
  ColumnSelector,
  DataTableBody,
  SortableHeader,
  TablePagination,
} from "@/components/custom-table";
import {
  useColumnOrder,
  useColumnVisibility,
  useFilteredAndPaginatedData,
  useSorting,
} from "@/app/[locale]/form-submissions/_hooks/table-related-hooks";
import {FormSubmissionResponse} from "@/model/API/form-submission-schema";

interface CustomizableTableProps {
data:FormSubmissionResponse
}

export function FormSubmissionTable({ data:{data,columns} }: CustomizableTableProps) {
  const { visibleColumns, toggleColumnVisibility } =
    useColumnVisibility(columns);
  const { sortConfig, handleSort } = useSorting();
  const { columnOrder } = useColumnOrder(columns);
  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useFilteredAndPaginatedData(data, sortConfig);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <SortableHeader
            visibleColumns={visibleColumns}
            columnOrder={columnOrder}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
          <DataTableBody
            data={paginatedData}
            columnOrder={columnOrder}
            visibleColumns={visibleColumns}
          />
        </Table>
      </div>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
