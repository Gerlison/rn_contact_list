import api from '../api';

type RequestMethods = 'get' | 'post' | 'put' | 'delete';

describe('api', () => {
  it.each<[RequestMethods]>([['get'], ['post'], ['put'], ['delete']])(
    'SHOULD have %s method',
    (method) => {
      expect(api[method]).toBeInstanceOf(Function);
    },
  );

  it('SHOULD have http://localhost as base URL', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:3000');
  });

  it('SHOULD have cancelTokenSource property', () => {
    expect(api.cancelTokenSource).toBeInstanceOf(Function);
  });
});
