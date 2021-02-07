import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import api from '../../services/api';
import useApi from '../useApi';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

jest.mock('../../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe('useApi', () => {
  describe('SHOULD call api with correct methods', () => {
    it.each<[RequestMethod]>([['get'], ['delete']])('%s', async (method) => {
      const { result } = renderHook(() => useApi(method, '/url'));
      await act(async () => {
        await result.current.fetch();
      });
      expect(api[method]).toHaveBeenCalled();
    });

    it.each<[RequestMethod]>([['post'], ['put']])('%s', async (method) => {
      const { result } = renderHook(() => useApi(method, '/url'));
      await act(async () => {
        await result.current.fetch({ name: 'test' });
      });
      expect(api[method]).toHaveBeenCalledWith(
        '/url',
        { name: 'test' },
        undefined,
      );
    });
  });

  describe('SHOULD start with initial values', () => {
    it('isLoading SHOULD be false', () => {
      const { result } = renderHook(() => useApi('get', '/url'));
      expect(result.current.isLoading).toBeFalsy();
    });

    it('errorMessage SHOULD be null', () => {
      const { result } = renderHook(() => useApi('get', '/url'));
      expect(result.current.errorMessage).toBeNull();
    });

    it('result SHOULD be null', () => {
      const { result } = renderHook(() => useApi('get', '/url'));
      expect(result.current.result).toBeNull();
    });
  });

  describe('WHEN call resquest method with success', () => {
    it('SHOULD set errorMessage to null', async () => {
      mockedApi.get.mockResolvedValue({ data: '' });

      const { result, waitForNextUpdate } = renderHook(() =>
        useApi('get', '/url'),
      );
      act(() => {
        result.current.fetch();
      });
      expect(result.current.errorMessage).toBeNull();
      await waitForNextUpdate();
    });

    it('SHOULD set isLoading to true', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useApi('get', '/url'),
      );
      act(() => {
        result.current.fetch();
      });
      expect(result.current.isLoading).toBeTruthy();
      await waitForNextUpdate();
    });

    it('SHOULD set result to api return', async () => {
      mockedApi.get.mockResolvedValue({ data: 'some result' });

      const { result } = renderHook(() => useApi('get', '/url'));
      await act(async () => {
        await result.current.fetch();
      });
      expect(result.current.result).toEqual('some result');
    });
  });

  describe('WHEN call resquest method with failure', () => {
    it('SHOULD set errorMessage to null', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useApi('get', '/url'),
      );
      act(() => {
        result.current.fetch();
      });
      expect(result.current.errorMessage).toBeNull();
      await waitForNextUpdate();
    });

    it('SHOULD set isLoading to true', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useApi('get', '/url'),
      );
      act(() => {
        result.current.fetch();
      });
      expect(result.current.isLoading).toBeTruthy();
      await waitForNextUpdate();
    });

    it('SHOULD set errorMessage to api return', async () => {
      mockedApi.get.mockRejectedValue('some error');

      const { result } = renderHook(() => useApi('get', '/url'));
      await act(async () => {
        await result.current.fetch();
      });
      expect(result.current.errorMessage).toEqual('some error');
    });
  });
});
