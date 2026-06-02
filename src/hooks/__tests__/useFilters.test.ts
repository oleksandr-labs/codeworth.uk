import { renderHook, act } from "@testing-library/react";
import { useFilters, DEFAULT_FILTERS } from "../useFilters";

describe("useFilters", () => {
  it("initializes with default filter state", () => {
    const { result } = renderHook(() => useFilters());
    expect(result.current.filters).toEqual(DEFAULT_FILTERS);
  });

  it("initializes with custom initial state", () => {
    const { result } = renderHook(() =>
      useFilters({ search: "ресторан", category: "Їжа" })
    );
    expect(result.current.filters.search).toBe("ресторан");
    expect(result.current.filters.category).toBe("Їжа");
    expect(result.current.filters.sort).toBe("popular");
  });

  it("setSearch updates search filter", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setSearch("салон краси");
    });
    expect(result.current.filters.search).toBe("салон краси");
  });

  it("setCategory updates category filter", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setCategory("Краса");
    });
    expect(result.current.filters.category).toBe("Краса");
  });

  it("setComplexity updates complexity filter", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setComplexity("medium");
    });
    expect(result.current.filters.complexity).toBe("medium");
  });

  it("setPriceRange updates price min and max", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setPriceRange(500, 5000);
    });
    expect(result.current.filters.priceMin).toBe(500);
    expect(result.current.filters.priceMax).toBe(5000);
  });

  it("setSort updates sort value", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setSort("price-asc");
    });
    expect(result.current.filters.sort).toBe("price-asc");
  });

  it("resetFilters restores defaults", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setSearch("ресторан");
      result.current.setCategory("Їжа");
      result.current.setComplexity("complex");
    });
    expect(result.current.filters.search).toBe("ресторан");
    act(() => {
      result.current.resetFilters();
    });
    expect(result.current.filters).toEqual(DEFAULT_FILTERS);
  });

  describe("activeCount", () => {
    it("is 0 with default filters", () => {
      const { result } = renderHook(() => useFilters());
      expect(result.current.activeCount).toBe(0);
    });

    it("increments for each active filter", () => {
      const { result } = renderHook(() => useFilters());
      act(() => {
        result.current.setSearch("test");
      });
      expect(result.current.activeCount).toBe(1);
      act(() => {
        result.current.setCategory("Краса");
      });
      expect(result.current.activeCount).toBe(2);
      act(() => {
        result.current.setComplexity("simple");
      });
      expect(result.current.activeCount).toBe(3);
    });

    it("counts price range as one filter when set", () => {
      const { result } = renderHook(() => useFilters());
      act(() => {
        result.current.setPriceRange(1000, 10000);
      });
      expect(result.current.activeCount).toBe(1);
    });

    it("resets to 0 after resetFilters", () => {
      const { result } = renderHook(() => useFilters());
      act(() => {
        result.current.setSearch("test");
        result.current.setCategory("IT");
      });
      expect(result.current.activeCount).toBe(2);
      act(() => {
        result.current.resetFilters();
      });
      expect(result.current.activeCount).toBe(0);
    });
  });

  describe("isFiltered", () => {
    it("is false with no active filters", () => {
      const { result } = renderHook(() => useFilters());
      expect(result.current.isFiltered).toBe(false);
    });

    it("is true when any filter is active", () => {
      const { result } = renderHook(() => useFilters());
      act(() => {
        result.current.setSearch("ресторан");
      });
      expect(result.current.isFiltered).toBe(true);
    });

    it("is false after reset", () => {
      const { result } = renderHook(() => useFilters());
      act(() => {
        result.current.setSearch("test");
        result.current.resetFilters();
      });
      expect(result.current.isFiltered).toBe(false);
    });
  });

  it("sort change does not affect activeCount", () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setSort("price-asc");
    });
    expect(result.current.activeCount).toBe(0);
  });
});
