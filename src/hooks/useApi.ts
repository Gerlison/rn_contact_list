import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import api from '../services/api';

const useApi = <Response>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  config?: AxiosRequestConfig,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<Response | null>(null);

  const fetch = useCallback(async (data?: any) => {
    try {
      setErrorMessage(null);
      setIsLoading(true);

      let response: AxiosResponse<Response>;
      if (method === 'get' || method === 'delete')
        response = await api[method](endpoint, config);
      else response = await api[method](endpoint, data, config);

      setIsLoading(false);
      setResult(response.data);
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e);
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
