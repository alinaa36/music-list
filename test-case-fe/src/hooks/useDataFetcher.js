import { useState, useEffect, useCallback } from 'react';

export function useDataFetcher(fetchFunction, options = {}) {
  const {
    pageSize = 10,
    initialPage = 1,
    transformResponse = (data) => data,
    dependencies = [],
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  // Filtering state
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Main fetch effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFunction({
          page,
          pageSize,
          searchTerm: debouncedSearchTerm,
          filters,
        });

        const processedData = transformResponse(response);

        setData(processedData.data || processedData);

        // Handle pagination if available
        if (processedData.total !== undefined) {
          setTotalPages(Math.ceil(processedData.total / pageSize));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    page,
    pageSize,
    debouncedSearchTerm,
    filters,
    fetchFunction,
    ...dependencies,
  ]);

  // Filter handling
  const applyFilter = useCallback((filterName, value) => {
    setFilters((prev) => {
      // If value is empty, remove the filter
      if (value === '' || value === null || value === undefined) {
        const newFilters = { ...prev };
        delete newFilters[filterName];
        return newFilters;
      }

      return { ...prev, [filterName]: value };
    });

    // Reset to first page when filtering
    setPage(1);
  }, []);

  // Search handling
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page when searching
  }, []);

  return {
    data,
    loading,
    error,

    // Pagination
    page,
    setPage,
    totalPages,

    // Filtering
    filters,
    applyFilter,

    // Search
    searchTerm,
    handleSearch,

    // Utils
    refresh: () => setPage(page), // Force refresh
  };
}
