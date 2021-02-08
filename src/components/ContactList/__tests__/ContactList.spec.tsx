import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import ContactList from '../ContactList';
import api from '../../../services/api';

jest.mock('../../../services/api', () => ({
  get: jest.fn(),
  cancelTokenSource: () => ({
    cancel: jest.fn(),
    token: [],
  }),
}));

const mockedApi = api as jest.Mocked<typeof api>;

const mockedContacts = [
  {
    id: '1',
    name: 'Joao Alves',
    phone: '(99) 9 9999-9999',
    city: 'Piquet Carneiro',
  },
  {
    id: '2',
    name: 'Joao Alves',
    phone: '(99) 9 9999-9999',
    city: 'Piquet Carneiro',
  },
  {
    id: '3',
    name: 'Joao Alves',
    phone: '(99) 9 9999-9999',
    city: 'Piquet Carneiro',
  },
  {
    id: '4',
    name: 'Joao Alves',
    phone: '(99) 9 9999-9999',
    city: 'Piquet Carneiro',
  },
];

describe('ContactList', () => {
  it('SHOULD renders correctly', async () => {
    await waitFor(() => render(<ContactList />));
  });

  it('SHOULD renders title', async () => {
    const component = render(<ContactList />);
    await waitFor(() => {
      const sut = component.queryByText('Contacts');
      expect(sut).toBeTruthy();
    });
  });

  it('SHOULD list contacts', async () => {
    mockedApi.get.mockResolvedValue({ data: mockedContacts });
    const component = render(<ContactList />);
    await waitFor(() => {
      const sut = component.queryAllByTestId('contact item');
      expect(sut.length).toBe(mockedContacts.length);
    });
  });
});
