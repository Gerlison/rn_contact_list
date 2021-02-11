import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';

import FormScreen from '../FormScreen';
import api from '../../services/api';
import { appContext } from '../../context';

jest.mock('../../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  cancelTokenSource: () => ({
    cancel: jest.fn(),
    token: [],
  }),
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe('FormScreen', () => {
  beforeAll(() => {
    mockedApi.get.mockResolvedValue({ data: ['test2'] });
  });

  describe('behavior', () => {
    let component: RenderAPI;
    const mockedDispatch = jest.fn();

    beforeEach(async () => {
      mockedDispatch.mockClear();
      component = await waitFor(() =>
        render(
          <appContext.Provider value={[{ contacts: [] }, mockedDispatch]}>
            <FormScreen />
          </appContext.Provider>,
        ),
      );
    });

    describe('WHEN is edition', () => {
      beforeAll(() => {
        useRoute.mockReturnValue({
          params: {
            contactToEdit: {
              id: '1',
              name: 'Joao',
              number: '1234',
              city: 'San Francisco',
            },
          },
        });
      });

      beforeEach(() => {
        mockedApi.put.mockClear();
        mockedApi.put.mockResolvedValue({ data: {} });
      });

      it('WHEN form is fullfiled SHOULD call api with put method', async () => {
        fireEvent.press(component.getByText('REGISTER'));
        await waitFor(() => expect(mockedApi.put).toBeCalled());
      });

      it('WHEN form is not fullfiled SHOULDN`T call api', async () => {
        useRoute.mockReturnValue({
          params: {},
        });
        const comp = await waitFor(() => render(<FormScreen />));
        fireEvent.press(comp.getByText('REGISTER'));
        expect(mockedApi.put).not.toBeCalled();
      });
    });

    describe('WHEN is creation', () => {
      it('WHEN form is not fullfiled SHOULDN`T call api', async () => {
        fireEvent.press(component.getByText('REGISTER'));
        expect(mockedApi.post).not.toBeCalled();
      });
    });

    it('SHOULD not submit if there is any empty field', async () => {
      fireEvent.press(component.getByText('REGISTER'));
      expect(mockedDispatch).not.toBeCalled();
    });
  });

  it('SHOULD render correctly', async () => {
    const component = await waitFor(() => render(<FormScreen />));
    expect(component).toBeTruthy();
  });

  it('SHOULD have a title "CONTACT REGISTER"', async () => {
    const component = await waitFor(() => render(<FormScreen />));
    expect(component.queryByText('CONTACT REGISTER')).toBeTruthy();
  });

  it('SHOULD have a name input', async () => {
    const component = await waitFor(() => render(<FormScreen />));
    expect(component.getByPlaceholderText('Name')).toBeTruthy();
  });

  it('SHOULD have a phone input', async () => {
    const component = await waitFor(() => render(<FormScreen />));
    expect(component.getByPlaceholderText('Phone Number')).toBeTruthy();
  });

  it('SHOULD have a city selector', async () => {
    const component = await waitFor(() => render(<FormScreen />));
    expect(component.queryByTestId('selector')).toBeTruthy();
  });

  it('SHOULD have a submit button', async () => {
    const component = await waitFor(() => render(<FormScreen />));
    expect(component.getByText('REGISTER')).toBeTruthy();
  });
});
