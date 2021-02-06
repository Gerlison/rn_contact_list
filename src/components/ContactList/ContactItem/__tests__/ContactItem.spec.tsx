import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import ContactItem from '../ContactItem';

describe('ContactItem', () => {
  it('SHOULD renders correctly', () => {
    render(<ContactItem onEdit={jest.fn()} onDelete={jest.fn()} />);
  });

  it('SHOULD match snapshot', () => {
    const sut = render(<ContactItem onEdit={jest.fn()} onDelete={jest.fn()} />);
    // expect(sut).toMatchSnapshot()
  });

  it.each([['profile icon'], ['contact name'], ['edit icon'], ['delete icon']])(
    'SHOULD have a %s',
    (testID) => {
      const { queryByTestId } = render(
        <ContactItem onEdit={jest.fn()} onDelete={jest.fn()} />,
      );
      const sut = queryByTestId(testID);
      expect(sut).toBeTruthy();
    },
  );

  it.each([['edit icon'], ['delete icon']])(
    'SHOULD call function on click on %s',
    (testID) => {
      const mockFn = jest.fn();
      const { queryByTestId } = render(
        <ContactItem onEdit={mockFn} onDelete={mockFn} />,
      );
      const sut = queryByTestId(testID);
      fireEvent.press(sut);
      expect(mockFn).toHaveBeenCalled();
    },
  );
});
