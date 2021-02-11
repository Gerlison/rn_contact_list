import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ListScreen from '../ListScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('../../services/api', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
  cancelTokenSource: () => ({
    cancel: jest.fn(),
    token: [],
  }),
}));

describe('ListScreen', () => {
  it('SHOULD render correctly', async () => {
    const component = await waitFor(() => render(<ListScreen />));
    expect(component).toBeTruthy();
  });

  it('SHOULD have a title "collaction"', async () => {
    const component = await waitFor(() => render(<ListScreen />));
    expect(component.queryByText('collaction')).toBeTruthy();
  });

  it('SHOULD have a list of contacts', async () => {
    await waitFor(() => {
      const component = render(<ListScreen />);
      expect(component.queryByText('Contacts')).toBeTruthy();
    });
  });

  it('SHOULD have an action button', async () => {
    await waitFor(() => {
      const component = render(<ListScreen />);
      expect(component.queryByTestId('action button')).toBeTruthy();
    });
  });

  it('SHOULD call navigate on press action button', async () => {
    await waitFor(() => {
      const component = render(<ListScreen />);
      fireEvent.press(component.getByTestId('action button'));
      expect(useNavigation().navigate).toBeCalledWith('FormScreen', {});
    });
  });
});
