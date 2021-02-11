import { reducer } from '../context';

const mockedContacts = [
  {
    id: '1',
    name: 'Joao',
    number: '123',
    city: 'San Francisco',
  },
];

describe('context', () => {
  it('WHEN dispatch a "load" type SHOULD return new state', () => {
    const sut = reducer(
      { contacts: [] },
      { type: 'load', payload: mockedContacts },
    );
    expect(sut).toEqual({ contacts: mockedContacts });
  });

  it('WHEN dispatch a "create" type SHOULD add new contact', () => {
    const sut = reducer(
      { contacts: [] },
      { type: 'create', payload: mockedContacts[0] },
    );
    expect(sut).toEqual({ contacts: mockedContacts });
  });

  it('WHEN dispatch a "update" type SHOULD update the contact', () => {
    const sut = reducer(
      {
        contacts: [
          {
            id: '1',
            name: 'Joao Alves',
            number: '123',
            city: 'San Francisco',
          },
        ],
      },
      { type: 'update', payload: mockedContacts[0] },
    );
    expect(sut).toEqual({ contacts: mockedContacts });
  });

  it('WHEN dispatch a "update" type AND id is invalid SHOULDN`T update any contact', () => {
    const oldState = [
      {
        id: '10',
        name: 'Joao Alves',
        number: '123',
        city: 'San Francisco',
      },
    ];
    const sut = reducer(
      {
        contacts: oldState,
      },
      { type: 'update', payload: mockedContacts[0] },
    );
    expect(sut).toEqual({
      contacts: oldState,
    });
  });

  it('WHEN dispatch a "delete" type SHOULD delete the contact', () => {
    const sut = reducer(
      {
        contacts: mockedContacts,
      },
      { type: 'delete', payload: mockedContacts[0].id },
    );
    expect(sut).toEqual({ contacts: [] });
  });

  it('WHEN dispatch a "delete" type AND id is invalid SHOULDN`T delete any contact', () => {
    const sut = reducer(
      {
        contacts: mockedContacts,
      },
      { type: 'delete', payload: '10' },
    );
    expect(sut).toEqual({ contacts: mockedContacts });
  });

  it('WHEN dispatch an "unknown" type SHOULD return the state', () => {
    const sut = reducer(
      {
        contacts: mockedContacts,
      },
      { type: 'unknown', payload: mockedContacts[0].id },
    );
    expect(sut).toEqual({ contacts: mockedContacts });
  });
});
