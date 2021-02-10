import { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import api from '../services/api';

interface Fetch {
  <T>(data: T): Promise<void>;
  (): Promise<void>
}

const useApi = <Response>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
) => {
  const cancelTokenRef = useRef<Canceler | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<Response | null>(null);

  useEffect(() => {
    const cancel = cancelTokenRef.current;
    return () => cancel?.();
  }, []);

  const fetch: Fetch = useCallback(
    async (data?: any) => {
      try {
        setErrorMessage(null);
        setIsLoading(true);

        cancelTokenRef.current?.();
        const source = api.cancelTokenSource();
        cancelTokenRef.current = source.cancel;

        const config: AxiosRequestConfig = {
          cancelToken: source.token,
          ...(requestConfig || {}),
        };

        let response: AxiosResponse<Response>;
        if (method === 'get' || method === 'delete')
          response = await api[method](endpoint, config);
        else response = await api[method](endpoint, data, config);

        setIsLoading(false);
        setResult(response.data);
      } catch (e) {
        setIsLoading(false);
        if (e?.response) return setErrorMessage(e.response.data.message);
        return setErrorMessage(e.message);
      }
    },
    [],
  );

  return {
    fetch,
    isLoading,
    errorMessage,
    result,
  };
};

export default useApi;
