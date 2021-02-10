import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';

import Input from '../Input';

describe('Input', () => {
  it('SHOULD render correctly', () => {
    const component = render(<Input onChange={jest.fn()} value={'test'} />);
    expect(component).toBeDefined();
  });

  it('SHOULD match snapshot', () => {
    const component = render(
      <Input onChange={jest.fn()} value={'test'} />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('SHOULD use passed value', () => {
    const component = render(<Input onChange={jest.fn()} value={'test'} />);
    expect(component.getByTestId('text input')?.props.value).toBe('test');
  });

  it('SHOULD call onChange on change text', () => {
    const mockedOnChangeText = jest.fn();
    const component = render(
      <Input onChangeText={mockedOnChangeText} value={'test'} />,
    );

    act(() => {
      fireEvent.changeText(component.getByTestId('text input'), 'Joao');
    });

    expect(mockedOnChangeText).toBeCalledWith('Joao');
  });
});
