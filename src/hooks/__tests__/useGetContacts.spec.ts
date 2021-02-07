import { renderHook } from '@testing-library/react-hooks';

import useGetContacts from '../useGetContacts';
import useApi from '../useApi';

const mockedReturn = {
  fetch: jest.fn(),
  isLoading: false,
  errorMessage: false,
  result: [
    {
      id: '1',
      name: 'Joao Alves',
      number: '(99) 9 9999-9999',
      city: 'San Francisco',
    },
  ],
};

jest.mock('../useApi', () => jest.fn(() => mockedReturn));

describe('useGetContacts', () => {
  it('SHOULD call useApi with correct params', () => {
    renderHook(useGetContacts);
    expect(useApi).toHaveBeenCalledWith('get', '/contacts');
  });

  it('SHOULD match useApi return', () => {
    const { result } = renderHook(useGetContacts);
    expect(result.current).toEqual(mockedReturn);
  });
});
