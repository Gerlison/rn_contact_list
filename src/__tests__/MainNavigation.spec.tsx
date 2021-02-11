import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import MainNavigation from '../MainNavigation';

jest.mock('../services/api', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
  cancelTokenSource: () => ({
    cancel: jest.fn(),
    token: [],
  }),
}));

describe('MainNavigation', () => {
  it('SHOULD renders correctly', async () => {
    await waitFor(() => render(<MainNavigation />));
  });

  it('SHOULD start on ListScreen', async () => {
    const component = await waitFor(() => render(<MainNavigation />));
    const sut = component.queryByText('collaction');
    expect(sut).toBeTruthy();
  });
});
