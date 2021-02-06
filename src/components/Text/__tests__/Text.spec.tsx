import React from 'react';
import { render } from '@testing-library/react-native';
import 'jest-styled-components';
import 'jest-styled-components/native';

import Text, { Props as TextProps } from '../Text';

describe('Text', () => {
  it('SHOULD renders correctly', () => {
    render(<Text />);
  });

  it('SHOULD match snapshot', () => {
    const sut = render(<Text />).toJSON();
    expect(sut).toMatchSnapshot();
  });

  it.each<[string, TextProps]>([
    [
      'variant',
      {
        variant: 'Poppins-Medium',
      },
    ],
    [
      'size',
      {
        size: 24,
      },
    ],
    [
      'color',
      {
        color: '#F0F0F0',
      },
    ],
  ])('SHOULD match %s style', (_, style) => {
    const sut = render(<Text {...style} />).toJSON();
    expect(sut).toHaveStyleRule('%i', style['%i']);
  });
});
