import axios, { AxiosInstance, CancelTokenSource } from 'axios';

interface Api extends AxiosInstance {
  cancelTokenSource: () => CancelTokenSource;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
}) as Api;

api.cancelTokenSource = axios.CancelToken.source;

export default api;
