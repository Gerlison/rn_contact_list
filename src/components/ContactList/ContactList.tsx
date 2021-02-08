import React, { memo, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import ContactItem from './ContactItem';
import Text from '../Text';
import useGetContacts from '../../hooks/useGetContacts';

import { Contact } from '../../types';


const ContactList = (): JSX.Element => {
  const {
    fetch,
    result: contactList,
    isLoading,
    errorMessage,
  } = useGetContacts();

  useEffect(() => {
    fetch();
  }, []);

  const ListEmptyComponent = useMemo(
    () => <Text>Empty list. Register a new Contact</Text>,
    [],
  );

  return (
    <S.Container>
      <Text>Contacts</Text>
      <S.List
        data={contactList}
        ItemSeparatorComponent={S.Divider}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={({  id  }) => id}
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
    margin-top: 16px;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: #000;
  `,
};

export default memo(ContactList);
