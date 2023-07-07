import { useEffect, useState } from "react";
import { defaultCacheTimeout } from "../config";
import axios, { AxiosResponse } from "axios";
import useCache from "../contexts/cacheContext";

type Options<T> = {
  cacheTimeout?: number;
  initial?: T;
  callback?: (data: T) => any;
  debug?: boolean;
  dependancies?: any[];
  manual?: boolean;
} & MethodTypes;

type MethodTypes =
  | { method: "POST"; body: object }
  | { method: "PUT"; body?: object }
  | { method?: "GET" | "DELETE" };

export default function useFetch<T>(url: string, options?: Options<T>) {
  const [data, setData] = useState<T | null>(
    options && options.initial ? options.initial : null
  );
  const [loading, setLoading] = useState<boolean>(
    options && options.manual ? false : true
  );

  const cache = useCache();

  function getCacheKey() {
    return `${url}:#:${(options && options.method) || "GET"}`;
  }

  async function loadData() {
    setLoading(true);

    const cachedValue = cache.data.filter((e) => e.key === getCacheKey())[0];

    if (
      (cachedValue &&
        Date.now() - cachedValue.updated <
          (options && options.cacheTimeout
            ? options.cacheTimeout
            : defaultCacheTimeout)) ||
      (options && options.debug && import.meta.env.MODE === "development")
    ) {
      setData(cachedValue.value);
      setLoading(false);
      return;
    }

    const fetchedData = await axios.get(url);

    cache.putCache(getCacheKey(), fetchedData.data);

    setData(fetchedData.data);
    setLoading(false);
  }

  async function makeRequest() {
    setLoading(true);

    const cachedValue = cache.data.filter((e) => e.key === getCacheKey())[0];

    if (
      (cachedValue &&
        Date.now() - cachedValue.updated <
          (options && options.cacheTimeout ? options.cacheTimeout : 0)) ||
      (options && options.debug && import.meta.env.MODE === "development")
    ) {
      setData(cachedValue.value);
      setLoading(false);
      return;
    }

    let fetchedData: AxiosResponse<any, any>;

    if (options && options.method) {
      if (options.method === "POST") {
        fetchedData = await axios.post(url, options.body);
      }
      if (options.method === "PUT") {
        fetchedData = await axios.put(url, options.body || {});
      } else {
        fetchedData = await axios.get(url);
      }
    } else {
      fetchedData = await axios.get(url);
    }

    cache.putCache(getCacheKey(), fetchedData.data);

    setData(fetchedData.data);
    setLoading(false);
  }

  function trigger() {
    if (
      options &&
      options.method &&
      (options.method === "POST" || options.method === "PUT")
    ) {
      makeRequest();
    } else {
      loadData();
    }
  }

  useEffect(() => {
    if (
      options &&
      !options.manual &&
      options.method &&
      (options.method === "POST" || options.method === "PUT")
    ) {
      makeRequest();
    } else {
      if (options && !options.manual) {
        loadData();
      }
    }
  }, (options && options.dependancies) || []);

  useEffect(() => {
    if (!loading && options && options.callback && data) {
      options.callback(data);
    }
  }, [loading]);

  return [data as T, loading as boolean, trigger as () => void] as const;
}
