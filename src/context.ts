import { createContext } from 'react';
import { Contact } from './types';

type Action =
  | { type: 'load'; payload: Contact[] }
  | { type: 'create' | 'update'; payload: Contact }
  | { type: 'delete'; payload: string };

interface State {
  contacts: Contact[];
}

export const appContext = createContext<[State, React.Dispatch<Action>] | []>(
  [],
);

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'load':
      return { ...state, contacts: action.payload };

    case 'create':
      return { ...state, contacts: [...state.contacts, action.payload] };

    case 'update':
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.payload.id) return action.payload;
          return item;
        }),
      };

    case 'delete':
      return {
        ...state,
        contacts: state.contacts.filter((item) => {
          if (item.id !== action.payload) return item;
        }),
      };

    default:
      return state;
  }
};
