import React, { memo } from 'react';
import styled from 'styled-components/native';

import ContactList from '../components/ContactList';

const ListScreen: React.FC = () => {
  return (
    <S.Container>
      <S.Title>collaction</S.Title>
      <ContactList />
      {/* <ActionButton /> */}
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
