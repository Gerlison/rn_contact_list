import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import ContactItem from '../ContactItem';
import { Contact } from '../../../../types';

const mockedContact: Contact = {
  id: '1',
  name: 'Joao Alves',
  number: '(99) 9 9999-9999',
  city: 'San Francisco',
};

describe('ContactItem', () => {
  it('SHOULD renders correctly', () => {
    render(
      <ContactItem
        contact={mockedContact}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );
  });

  it('SHOULD match snapshot', () => {
    const sut = render(
      <ContactItem
        contact={mockedContact}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );
    expect(sut).toMatchSnapshot();
  });

  it.each([['profile icon'], ['contact name'], ['edit icon'], ['delete icon']])(
    'SHOULD have a %s',
    (testID) => {
      const { queryByTestId } = render(
        <ContactItem
          contact={mockedContact}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
        />,
      );
      const sut = queryByTestId(testID);
      expect(sut).toBeTruthy();
    },
  );

  it.each([['edit icon'], ['delete icon']])(
    'SHOULD call function on click on %s',
    (testID) => {
      const mockFn = jest.fn();
      const { getByTestId } = render(
        <ContactItem
          contact={mockedContact}
          onEdit={mockFn}
          onDelete={mockFn}
        />,
      );
      const sut = getByTestId(testID);
      fireEvent.press(sut);
      expect(mockFn).toHaveBeenCalled();
    },
  );
});
