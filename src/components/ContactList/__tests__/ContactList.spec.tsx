import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import ContactList from '../ContactList';
import { appContext } from '../../../context';

jest.mock('../../../services/api', () => ({
  get: jest.fn(),
  cancelTokenSource: () => ({
    cancel: jest.fn(),
    token: [],
  }),
}));

const mockedContext = {
  contacts: [
    {
      id: '1',
      name: 'Joao Alves',
      number: '(99) 9 9999-9999',
      city: 'Piquet Carneiro',
    },
    {
      id: '2',
      name: 'Joao Alves',
      number: '(99) 9 9999-9999',
      city: 'Piquet Carneiro',
    },
    {
      id: '3',
      name: 'Joao Alves',
      number: '(99) 9 9999-9999',
      city: 'Piquet Carneiro',
    },
    {
      id: '4',
      name: 'Joao Alves',
      number: '(99) 9 9999-9999',
      city: 'Piquet Carneiro',
    },
  ],
};

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
    const component = render(
      <appContext.Provider value={[mockedContext, () => {}]}>
        <ContactList />
      </appContext.Provider>,
    );
    await waitFor(() => {
      const sut = component.queryAllByTestId('contact item');
      expect(sut.length).toBe(mockedContext.contacts.length);
    });
  });
});
