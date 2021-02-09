import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

import Text from '../../Text';

import { Contact } from '../../../types';

import icProfile from '../../../../assets/icons/icProfile.png';
import icEdit from '../../../../assets/icons/icEdit.png';
import icDelete from '../../../../assets/icons/icDelete.png';

interface Props {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactItem = ({ contact, onDelete, onEdit }: Props): JSX.Element => (
  <S.Container testID="contact item">
    <S.Row style={{ flex: 1 }}>
      <S.Image testID='profile icon' marginRight={16} size={26} source={icProfile} />
      <S.Text testID='contact name' numberOfLines={1} size={18}>
            {contact.name}
      </S.Text>
    </S.Row>

    <S.Row>
      <TouchableOpacity testID="edit icon" onPress={onEdit}>
        <S.Image marginRight={24} size={18} source={icEdit} />
      </TouchableOpacity>

      <TouchableOpacity testID="delete icon" onPress={onDelete}>
        <S.Image size={18} source={icDelete} />
      </TouchableOpacity>
    </S.Row>
  </S.Container>
);

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
