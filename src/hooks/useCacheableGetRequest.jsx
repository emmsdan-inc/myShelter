import React from "react";
import { searchService } from "../services/media";

export default function useCacheableGetRequest(
  initUri,
  cache = true,
  queryParams = {}
) {
  const [init, setInit] = React.useState(cache);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [lastPage, setLastPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [meta, setMeta] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [reset, setReset] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [params, setParams] = React.useState(queryParams || {});
  const [newUrl, setUrl] = React.useState(initUri);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!init) {
      setData([]);
    }
    try {
      const httpUrl = `${newUrl}`;
      const resp = await searchService(httpUrl, {
        page,
        limit,
        ...params,
      });
      if (resp.data) {
        if (init && !reset) {
          setData([...new Set([...data, ...resp.data])]);
        } else {
          setData(resp.data);
        }
        setReset(false);
        setMeta(resp.meta);
        setLastPage(resp.meta.last_page);
      }
    } catch (error) {
      console.error({ error });
      setError(error);
    }
    setLoading(false);
  }, [page, params]);

  React.useEffect(() => {
    // if (!init)return
    // Fetch data
    fetchData();
  }, [page, params, init]);
  return {
    data,
    loading,
    error,
    hasMore: true,
    isLastPage: page === lastPage,
    isFirst: page === 1,
    setParams,
    setLimit,
    setUrl,
    meta,
    reset: (params) => {
      setData([]);
      setParams(params);
      setPage(1);
      setReset(true);
    },
    fetch: (state = true) => {
      setInit(state);
    },
    fetchData: () => {
      fetchData();
      setParams({ io: Math.random() });
    },
    next: () => {
      if (page < lastPage) {
        setPage(page + 1);
        // setInit(false);
      }
    },
    prev: () => {
      if (page > 1) {
        setInit(false);
        setPage(page - 1);
      }
    },
  };
}

export const useHttpRequest = (httpUrl) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  async function sendRequest() {
    setLoading(true);
    try {
      const response = await searchService(httpUrl, {});
      setLoading(false);
      if (response.error) {
        setError(response.error);
        return;
      }
      setData(response);
    } catch (err) {
      setError("Sorry, an error occured");
    }
    setLoading(false);
  }
  return { loading, data, error, sendRequest };
};
