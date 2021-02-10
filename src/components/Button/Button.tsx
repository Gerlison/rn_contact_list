import React, { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import Text from '../Text';

interface Props extends TouchableOpacityProps {
  label: string;
}

const Button = ({ label, ...props }: Props): JSX.Element => {
  return (
    <S.Touchable {...props}>
      <Text variant="Poppins-SemiBold" size={18} color="#fff">
        {label.toUpperCase()}
      </Text>
    </S.Touchable>
  );
};

const S = {
  Touchable: styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    padding: 18px;
    margin-top: 32px;
    border-radius: 20px;
    background-color: #7c37a6;
  `,
};

export default memo(Button);
