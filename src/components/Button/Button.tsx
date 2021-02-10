import React, { memo } from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import Text from '../Text';

interface Props extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
}

const Button = ({ label, isLoading, ...props }: Props): JSX.Element => {
  return (
    <S.Touchable {...props}>
      {isLoading ? (
        <ActivityIndicator testID="button loading" />
      ) : (
        <Text variant="Poppins-SemiBold" size={18} color="#fff">
          {label.toUpperCase()}
        </Text>
      )}
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
