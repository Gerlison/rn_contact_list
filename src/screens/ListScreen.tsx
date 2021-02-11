import React from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import ActionButton from '../components/ActionButton';
import ContactList from '../components/ContactList';

import { RootStackParams } from '../MainNavigation';

import icPlus from '../../assets/icons/icPlus.png';

const ListScreen: React.FC = () => {
  const { navigate } = useNavigation<
    StackNavigationProp<RootStackParams, 'ListScreen'>
  >();

  return (
    <S.Container>
      <S.Title>collaction</S.Title>
      <ContactList />
      <ActionButton onPress={() => navigate('FormScreen', {})} icon={icPlus} />
    </S.Container>
  );
};

export const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,
  Title: styled.Text`
    font-family: 'LeituraNews';
    font-size: 36px;
    align-self: center;
    margin: 56px 0px 24px;
  `,
};

export default ListScreen;
