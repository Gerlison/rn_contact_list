import { Contact } from '../types';
import useApi from './useApi';

const useGetContacts = () => {
  const api = useApi<Contact[]>('get', '/contacts');
  return api;
};

export default useGetContacts;
