import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';

import Selector from '../Selector';

const mockedItems = [
  {
    label: 'test',
    value: 'test',
  },
  {
    label: 'test2',
    value: 'test2',
  },
];

describe('Selector', () => {
  it('SHOULD render correctly', () => {
    const component = render(
      <Selector
        items={[]}
        isLoading={false}
        onValueChange={jest.fn()}
        selectedValue={'test'}
      />,
    );
    expect(component).toBeDefined();
  });

  it('SHOULD match snapshot', () => {
    const component = render(
      <Selector
        items={[]}
        isLoading={false}
        onValueChange={jest.fn()}
        selectedValue={'test'}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('SHOULD show picker on click touchable', async () => {
    const component = render(
      <Selector
        items={mockedItems}
        isLoading={false}
        onValueChange={jest.fn()}
        selectedValue=""
      />,
    );

    act(() => {
      fireEvent.press(component.getByTestId('selector touchable'));
    });

    expect(component.queryByTestId('selector picker')).toBeTruthy();
  });
});
