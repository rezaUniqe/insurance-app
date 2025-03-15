"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  SlidersHorizontal,
} from "lucide-react";

interface SortConfig {
  column: string;
  direction: "asc" | "desc";
}

export function SortableHeader({
  visibleColumns,
  columnOrder,
  sortConfig,
  handleSort,
}: {
  visibleColumns: string[];
  columnOrder: string[];
  sortConfig: SortConfig | null;
  handleSort: (column: string) => void;
}) {


  return (
    <TableHeader>
      <TableRow>
            {columnOrder
              .filter((column) => visibleColumns.includes(column))
              .map((column) => (
                <SortableHeaderCell
                  key={column}
                  column={column}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
              ))}
      </TableRow>
    </TableHeader>
  );
}

export function SortableHeaderCell({
  column,
  sortConfig,
  onSort,
}: {
  column: string;
  sortConfig: SortConfig | null;
  onSort: (column: string) => void;
}) {



  return (
    <TableHead
      className="cursor-pointer select-none"
      onClick={() => onSort(column)}
    >
      <span className="flex items-center gap-2">
        <span>{column}</span>
        {sortConfig?.column === column &&
          (sortConfig.direction === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          ))}
      </span>
    </TableHead>
  );
}

export function DataTableBody({
  data,
  columnOrder,
  visibleColumns,
}: {
  data: Record<string, any>[];
  columnOrder: string[];
  visibleColumns: string[];
}) {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map((row) => (
          <TableRow key={row.id}>
            {columnOrder
              .filter((column) => visibleColumns.includes(column))
              .map((column) => (
                <TableCell key={`${row.id}-${column}`}>{row[column]}</TableCell>
              ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={visibleColumns.length}
            className="h-24 text-center"
          >
            No results found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export function TablePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber;

          if (totalPages <= 5) {
            pageNumber = i + 1;
          } else if (currentPage <= 3) {
            pageNumber = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
          } else {
            pageNumber = currentPage - 2 + i;
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function ColumnSelector({
  columns,
  visibleColumns,
  toggleColumnVisibility,
}: {
  columns: string[];
  visibleColumns: string[];
  toggleColumnVisibility: (column: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column}
            checked={visibleColumns.includes(column)}
            onCheckedChange={() => toggleColumnVisibility(column)}
          >
            {column}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
