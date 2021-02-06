import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

import ContactList from '../ContactList';

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
  let component: RenderAPI;

  beforeEach(() => {
    component = render(<ContactList />);
  });

  it('SHOULD renders correctly', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD renders title', () => {
    const sut = component.queryByText('Contacts');
    expect(sut).toBeTruthy();
  });

  it('SHOULD list contacts', () => {
    const sut = component.getAllByA11yLabel('contact item');
    expect(sut.length).toBe(4);
  });
});
