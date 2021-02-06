import React from 'react';
import { render } from '@testing-library/react-native';
import MainNavigation from '../MainNavigation';

describe('MainNavigation', () => {
  it('SHOULD renders correctly', () => {
    render(<MainNavigation />);
  });
});
