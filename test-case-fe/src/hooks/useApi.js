import { useState, useEffect } from 'react';

export function useApi(apiCall, initialParams = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(initialParams.page || 1);
  const [limit, setLimit] = useState(initialParams.limit || 3);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(initialParams.query || {});
  const [autoExecute, setAutoExecute] = useState(
    initialParams.autoExecute !== false,
  );

  const execute = async ({
    method = 'GET',
    body = null,
    customParams = {},
    overrideQuery = null,
    id = null,
    file = null,
  } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const finalQuery = overrideQuery ?? query;
      const response = await apiCall({
        ...(method === 'GET' && { page, limit, query: finalQuery }),
        ...(method === 'POST' && { body, page, limit, query: finalQuery }),
        ...(method === 'DELETE' && { id }),
        ...customParams,
      });

      console.log('Api Call:', id);

      const extracted = response?.data ?? response?.tracks ?? response;
      console.log('API Response:', extracted);
      setData(extracted);
      if (response?.meta?.total) {
        setTotalPages(Math.ceil(response.meta.total / limit));
      }
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (autoExecute) {
      execute();
    }
  }, [page]);

  return {
    data,
    loading,
    error,
    execute,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    changePage,
    query,
    setQuery,
  };
}
