import React from 'react';
import { render } from '@testing-library/react-native';
import 'jest-styled-components';
import 'jest-styled-components/native';

import Text, { Props as TextProps } from '../Text';

describe('Text', () => {
  it('SHOULD match snapshot', () => {
    const sut = render(<Text>foo</Text>).toJSON();
    expect(sut).toMatchSnapshot();
  });

  it('SHOULD render the text passed as children', () => {
    const sut = render(<Text>foo</Text>).toJSON();
    expect(sut?.children).toEqual(['foo']);
  });

  it('SHOULD use default styles WHEN no props passed', () => {
    const sut = render(<Text>foo</Text>).toJSON();
    expect(sut).toHaveStyleRule('font-family', 'Poppins-Regular');
    expect(sut).toHaveStyleRule('font-size', 16);
    expect(sut).toHaveStyleRule('color', '#2f2f2f');
  });

  it.each<[string, string, string | number]>([
    ['font-family', 'variant', 'Poppins-Medium'],
    ['font-size', 'size', 24],
    ['color', 'color', '#F0F0F0'],
  ])('SHOULD match %s style', (style, prop, value) => {
    const sut = render(<Text {...{ [prop]: value }}>foo</Text>).toJSON();
    expect(sut).toHaveStyleRule(style, value);
  });
});
