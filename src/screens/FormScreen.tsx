import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import Input from '../components/Input/Input';
import Selector from '../components/Selector';
import Text from '../components/Text';
import Button from '../components/Button';

import useApi from '../hooks/useApi';
import { RootStackParams } from '../MainNavigation';
import { Contact } from '../types';
import { appContext } from '../context';

const FormScreen: React.FC = () => {
  const [, dispatch] = useContext(appContext);

  const {
    params: { contactToEdit },
  } = useRoute<RouteProp<RootStackParams, 'FormScreen'>>();
  const { pop } = useNavigation<
    StackNavigationProp<RootStackParams, 'FormScreen'>
  >();

  const [citiesList, setCitiesList] = useState<
    { label: string; value: string }[]
  >([]);
  const [name, setName] = useState(contactToEdit?.name ?? '');
  const [number, setNumber] = useState(contactToEdit?.number ?? '');
  const [city, setCity] = useState(contactToEdit?.city ?? '');

  const {
    fetch: fetchCities,
    isLoading: isLoadingCities,
    result: citiesResult,
  } = useApi<string[]>('get', '/cities');

  const { fetch: postContact, isLoading: isLoadingPostContact } = useApi(
    'post',
    '/contacts',
  );

  const { fetch: updateContact, isLoading: isLoadingUpdateContact } = useApi(
    'put',
    `/contacts/${contactToEdit?.id}`,
  );

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (citiesResult)
      setCitiesList(
        citiesResult.map((item) => ({
          label: item,
          value: item,
        })),
      );
  }, [citiesResult]);

  const handleCreate = useCallback(
    async (newContact) => {
      const contactToCreate = {
        id: new Date().getTime().toString(),
        ...newContact,
      };

      dispatch?.({
        type: 'create',
        payload: contactToCreate,
      });
      await postContact<Contact>(contactToCreate);
    },
    [postContact],
  );

  const handleUpdate = useCallback(
    async (newContact) => {
      const contactToUpdate = {
        id: contactToEdit?.id,
        ...newContact,
      };

      dispatch?.({
        type: 'update',
        payload: contactToUpdate,
      });
      await updateContact<Contact>(contactToUpdate);
    },
    [updateContact, contactToEdit],
  );

  const handleSubmit = useCallback(async () => {
    if (!name || !number || !city) return;

    const newContact = { name, number, city };

    if (contactToEdit) {
      await handleUpdate(newContact);
    } else {
      await handleCreate(newContact);
    }
    pop();
  }, [name, number, city, contactToEdit, pop, handleUpdate, handleCreate]);

  return (
    <S.Container>
      <S.Title>CONTACT REGISTER</S.Title>
      <Input autoFocus placeholder="Name" onChangeText={setName} value={name} />
      <Input
        keyboardType="phone-pad"
        placeholder="Phone Number"
        onChangeText={setNumber}
        value={number}
      />
      <Selector
        items={citiesList}
        selectedValue={city}
        onValueChange={setCity}
        isLoading={isLoadingCities}
      />
      <Button
        label="REGISTER"
        onPress={handleSubmit}
        isLoading={isLoadingUpdateContact || isLoadingPostContact}
        disabled={isLoadingUpdateContact || isLoadingPostContact}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
    padding: 18px;
  `,
  Title: styled(Text).attrs({
    size: 18,
  })`
    align-self: center;
    margin: 36px;
    margin-bottom: 72px;
  `,
};

export default FormScreen;
