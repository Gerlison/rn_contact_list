import React, { memo } from 'react';
import { ImageSourcePropType, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends TouchableOpacityProps {
  icon: ImageSourcePropType;
}

const ActionButton = ({ icon, ...props }: Props): JSX.Element => {
  return (
    <S.Touchable testID="action button" {...props}>
      <S.Image source={icon} />
    </S.Touchable>
  );
};

const S = {
  Touchable: styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    padding: 18px;
    border-radius: 100px;
    background-color: #7c37a6;
    position: absolute;
    bottom: 32px;
    right: 18px;
  `,
  Image: styled.Image.attrs({
    resizeMode: 'contain',
  })`
    width: 22px;
    height: 22px;
  `,
};

export default memo(ActionButton);
