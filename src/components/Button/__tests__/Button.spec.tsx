import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Button from '../Button';

describe('Button', () => {
  it('SHOULD match snapshot', () => {
    const component = render(<Button label="foo" />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('SHOULD call onPress on click', () => {
    const mockFn = jest.fn();
    const component = render(<Button label="foo" onPress={mockFn} />);
    fireEvent.press(component.getByText('FOO'));
    expect(mockFn).toBeCalled();
  });
});
