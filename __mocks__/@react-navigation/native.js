
const RNN = require('@react-navigation/native')
let listeners = {}
const setOptions = jest.fn()
const navigate = jest.fn()

const navigation = {
  setOptions,
  navigate,
  addListener: jest.fn((name, l) => (listeners[name] = l)),
  getListener: (name) => listeners[name],
  triggerListener: (name, ...params) => listeners[name](...params),
  resetListeners: () => {
    listeners = {}
  },
}

const useNavigation = () => navigation
let params = {}
const useRoute = jest.fn(() => ({
  params: params,
}));

module.exports = {
  ...RNN,
  useNavigation,
  useRoute,
  setParams: (p) => (params = { ...params, ...p }),
}
