import React, { memo } from 'react';
import styled from 'styled-components/native';

import Text from '../Text';

const ContactList: React.FC = () => {
  return (
    <S.Container>
      <Text>Contacts</Text>
    </S.Container>
  );
};

const S = {
  Container: styled.View``,
};

export default memo(ContactList);
