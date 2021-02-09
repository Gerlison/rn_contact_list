import React, { memo, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import ContactItem from './ContactItem';
import Text from '../Text';
import useApi from '../../hooks/useApi';

import { Contact } from '../../types';


const ContactList = (): JSX.Element => {
  const { fetch, result: contactList, isLoading, errorMessage } = useApi<
    Contact[]
  >('get', '/contacts');

  useEffect(() => {
    fetch();
  }, []);

  const ListEmptyComponent = useMemo(
    () => <Text>Empty list. Register a new Contact</Text>,
    [],
  );

  if (isLoading) return <S.Loading size="large" />;

  return (
    <S.Container>
      <Text variant="Poppins-Medium" color='#999FAE' size={18}>Contacts</Text>
      <S.List
        data={contactList}
        ItemSeparatorComponent={S.Divider}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ContactItem contact={item} onEdit={() => {}} onDelete={() => {}} />
        )}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.View`
    padding: 16px;
  `,
  List: styled(FlatList as new () => FlatList<Contact>)`
    margin-top: 28px;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.25);
  `,
  Loading: styled.ActivityIndicator`
    flex: 1;
    align-self: center;
    justify-content: center;
  `,
};

export default memo(ContactList);
