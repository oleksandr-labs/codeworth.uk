"use client";

import { useState, useCallback, useMemo } from "react";

export interface FilterState {
  search: string;
  category: string;
  complexity: string;
  priceMin: number;
  priceMax: number;
  sort: string;
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "",
  complexity: "",
  priceMin: 0,
  priceMax: Infinity,
  sort: "popular",
};

export interface UseFiltersReturn {
  filters: FilterState;
  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
  setComplexity: (v: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSort: (v: string) => void;
  resetFilters: () => void;
  activeCount: number;
  isFiltered: boolean;
}

export function useFilters(initial?: Partial<FilterState>): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const setSearch = useCallback((v: string) => {
    setFilters((prev) => ({ ...prev, search: v }));
  }, []);

  const setCategory = useCallback((v: string) => {
    setFilters((prev) => ({ ...prev, category: v }));
  }, []);

  const setComplexity = useCallback((v: string) => {
    setFilters((prev) => ({ ...prev, complexity: v }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }));
  }, []);

  const setSort = useCallback((v: string) => {
    setFilters((prev) => ({ ...prev, sort: v }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.complexity) count++;
    if (filters.priceMin > 0 || filters.priceMax < Infinity) count++;
    return count;
  }, [filters]);

  const isFiltered = activeCount > 0;

  return {
    filters,
    setSearch,
    setCategory,
    setComplexity,
    setPriceRange,
    setSort,
    resetFilters,
    activeCount,
    isFiltered,
  };
}
