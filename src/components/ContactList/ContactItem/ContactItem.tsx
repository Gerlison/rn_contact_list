import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Text from '../../Text';

import { Contact } from '../../../types';

import { RootStackParams } from '../../../MainNavigation';

import icProfile from '../../../../assets/icons/icProfile.png';
import icEdit from '../../../../assets/icons/icEdit.png';
import icDelete from '../../../../assets/icons/icDelete.png';
import useApi from '../../../hooks/useApi';

interface Props {
  contact: Contact;
}

const ContactItem = ({ contact }: Props): JSX.Element => {
  const { navigate } = useNavigation<
    StackNavigationProp<RootStackParams, 'ListScreen'>
  >();

  const { fetch } = useApi('delete', `/contacts/${contact.id}`);

  const handleDelete = useCallback(() => {
    fetch();
  }, [fetch]);

  return (
    <S.Container testID="contact item">
      <S.Row style={{ flex: 1 }}>
        <S.Image
          testID="profile icon"
          marginRight={16}
          size={26}
          source={icProfile}
        />
        <S.Text testID="contact name" numberOfLines={1} size={18}>
          {contact.name}
        </S.Text>
      </S.Row>

      <S.Row>
        <TouchableOpacity
          testID="edit icon"
          onPress={() => navigate('FormScreen', { contactToEdit: contact })}
        >
          <S.Image marginRight={24} size={18} source={icEdit} />
        </TouchableOpacity>

        <TouchableOpacity testID="delete icon" onPress={handleDelete}>
          <S.Image size={18} source={icDelete} />
        </TouchableOpacity>
      </S.Row>
    </S.Container>
  );
};

const S = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px 0px;
  `,
  Row: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Text: styled(Text)`
    flex: 1;
    padding-right: 24px;
  `,
  Image: styled.Image.attrs({
    resizeMode: 'contain',
  })<{ size: number; marginRight?: number; marginLeft?: number }>`
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
  `,
};

export default memo(ContactItem);
