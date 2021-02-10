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

  it('SHOULD show loading when isLoading is true', () => {
    const component = render(
      <Button label="foo" onPress={jest.fn()} isLoading />,
    );
    expect(component.getByTestId('button loading')).toBeTruthy();
  });

  it('SHOULD show label when isLoading is false', () => {
    const component = render(
      <Button label="foo" onPress={jest.fn()} isLoading={false} />,
    );
    expect(component.getByText('FOO')).toBeTruthy();
  });
});
