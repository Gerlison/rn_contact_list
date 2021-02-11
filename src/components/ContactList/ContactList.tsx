import React, { memo, useContext, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import ContactItem from './ContactItem';
import Text from '../Text';

import useApi from '../../hooks/useApi';
import { Contact } from '../../types';
import { appContext } from '../../context';


const ContactList = (): JSX.Element => {
  const [state, dispatch] = useContext(appContext);
  const { fetch, result, isLoading } = useApi<Contact[]>('get', '/contacts');

  useEffect(() => {
    fetch();
  }, []);
  
  useEffect(() => {
    if (result) dispatch?.({ type: 'load', payload: result });
  }, [result]);

  const ListEmptyComponent = useMemo(
    () => <Text>Empty list. Register a new Contact</Text>,
    [],
  );

  if (isLoading) return <S.Loading size="large" />;

  return (
    <S.Container>
      <Text variant="Poppins-Medium" color="#999FAE" size={18}>
        Contacts
      </Text>
      <S.List
        data={state?.contacts}
        ItemSeparatorComponent={S.Divider}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ContactItem contact={item} />}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.View`
    padding: 16px;
    padding-right: 0px;
  `,
  List: styled(FlatList as new () => FlatList<Contact>).attrs({
    contentContainerStyle: {
      paddingRight: 16,
      paddingBottom: 250,
    },
  })`
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
