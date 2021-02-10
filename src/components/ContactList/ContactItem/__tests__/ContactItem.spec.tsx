import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import ContactItem from '../ContactItem';
import api from '../../../../services/api';

import { Contact } from '../../../../types';

const mockedContact: Contact = {
  id: '1',
  name: 'Joao Alves',
  number: '(99) 9 9999-9999',
  city: 'San Francisco',
};

describe('ContactItem', () => {
  it('SHOULD renders correctly', () => {
    render(<ContactItem contact={mockedContact} />);
  });

  it('SHOULD match snapshot', () => {
    const sut = render(<ContactItem contact={mockedContact} />);
    expect(sut).toMatchSnapshot();
  });

  it.each([['profile icon'], ['contact name'], ['edit icon'], ['delete icon']])(
    'SHOULD have a %s',
    (testID) => {
      const { queryByTestId } = render(<ContactItem contact={mockedContact} />);
      const sut = queryByTestId(testID);
      expect(sut).toBeTruthy();
    },
  );

  it('SHOULD call function on click on edit icon', () => {
    const { getByTestId } = render(<ContactItem contact={mockedContact} />);
    const sut = getByTestId('edit icon');
    fireEvent.press(sut);
    expect(useNavigation().navigate).toHaveBeenCalledWith('FormScreen', {
      contactToEdit: mockedContact,
    });
  });

  it('SHOULD call function on click on delete icon', async () => {
    api.delete = jest.fn().mockResolvedValue({ data: {} });
    const { getByTestId } = render(<ContactItem contact={mockedContact} />);
    const sut = getByTestId('delete icon');
    fireEvent.press(sut);
    await waitFor(() =>
      expect(api.delete).toHaveBeenCalledWith('/contact/1', expect.anything()),
    );
  });
});
