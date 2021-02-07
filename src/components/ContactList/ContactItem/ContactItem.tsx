import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Text from '../../Text';

import profileIcon from '../../../../assets/icons/profile.svg';
import editIcon from '../../../../assets/icons/edit.svg';
import deleteIcon from '../../../../assets/icons/delete.svg';
import { Contact } from '../ContactList';

interface Props {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactItem = ({ contact, onDelete, onEdit }: Props): JSX.Element => (
  <S.Container testID="contact item">
    <S.Image testID="profile icon" source={profileIcon} />
    <Text testID="contact name">{contact.name}</Text>

    <TouchableOpacity testID="edit icon" onPress={onEdit}>
      <S.Image source={editIcon} />
    </TouchableOpacity>

    <TouchableOpacity testID="delete icon" onPress={onDelete}>
      <S.Image source={deleteIcon} />
    </TouchableOpacity>
  </S.Container>
);

const S = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Image: styled.Image``,
};

export default memo(ContactItem);
