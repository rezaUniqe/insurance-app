import {useEffect, useMemo, useState} from "react";
import type {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

interface SortConfig {
  column: string;
  direction: "asc" | "desc";
}

export function useColumnVisibility(initialColumns: string[]) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(initialColumns);
  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };
  return { visibleColumns, toggleColumnVisibility };
}

export function useSorting() {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const handleSort = (column: string) => {
    setSortConfig((prev) => ({
      column,
      direction: prev && prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  return { sortConfig, handleSort };
}

export function useColumnOrder(initialColumns: string[]) {
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumns);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setColumnOrder((currentOrder) => {
        const oldIndex = currentOrder.indexOf(active.id as string);
        const newIndex = currentOrder.indexOf(over.id as string);
        return arrayMove(currentOrder, oldIndex, newIndex);
      });
    }
  };
  return { columnOrder, handleDragEnd };
}

export function useFilteredAndPaginatedData(data: Record<string, string|number>[], sortConfig: SortConfig | null) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];
    if (searchTerm) {
      result = result.filter((item) =>
        Object.entries(item).some(([key, value]) =>
          key !== "id" && String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.column];
        const bValue = b[sortConfig.column];
        return aValue < bValue ? (sortConfig.direction === "asc" ? -1 : 1) : aValue > bValue ? (sortConfig.direction === "asc" ? 1 : -1) : 0;
      });
    }
    return result;
  }, [data, searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredAndSortedData.length, totalPages, currentPage]);

  return { searchTerm, setSearchTerm, paginatedData, currentPage, setCurrentPage, totalPages };
}