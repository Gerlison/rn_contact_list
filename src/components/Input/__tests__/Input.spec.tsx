import React from 'react';
import { render } from '@testing-library/react-native';

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
});
