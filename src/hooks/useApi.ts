import { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse, Canceler, AxiosError } from 'axios';
import api from '../services/api';

interface Fetch {
  <T>(data: T): Promise<void>;
  (): Promise<void>;
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
    return () => cancelTokenRef.current?.();
  }, []);

  const apiRequest = useCallback(async (data: unknown) => {
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

    return response.data;
  }, []);

  const fetch: Fetch = useCallback(async (data?: unknown) => {
    try {
      setErrorMessage(null);
      setIsLoading(true);
      const response = await apiRequest(data);;
      setIsLoading(false);
      setResult(response);
    } catch (e) {
      if (e instanceof Error) {
        setIsLoading(false);
        const message = (e as AxiosError)?.response?.data.message ?? e.message
        return setErrorMessage(message);
      }
    }
  }, []);

  return {
    fetch,
    isLoading,
    errorMessage,
    result,
  };
};

export default useApi;
