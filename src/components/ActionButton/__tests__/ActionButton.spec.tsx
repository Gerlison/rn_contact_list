import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ActionButton from '../ActionButton';

import icPlus from '../../../../assets/icons/icPlus.png';

describe('ActionButton', () => {
  it('SHOULD match snapshot', () => {
    const component = render(<ActionButton icon={icPlus} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('SHOULD call onPress on click', () => {
    const mockFn = jest.fn();
    const component = render(<ActionButton icon={icPlus} onPress={mockFn} />);
    fireEvent.press(component.getByTestId('action button'));
    expect(mockFn).toBeCalled();
  });
});
