import React, { memo } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import ContactItem from './ContactItem';
import Text from '../Text';

export interface Contact {
  id: string;
  name: string;
  number: string;
  city: string;
}

const ContactList = (): JSX.Element => {
  const list: Contact[] = [];

  return (
    <S.Container>
      <Text>Contacts</Text>
      <S.List
        data={list}
        ItemSeparatorComponent={S.Divider}
        keyExtractor={(item) => item.id}
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
