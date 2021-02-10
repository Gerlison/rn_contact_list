import React, { memo } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextInputProps {}

const Input = (props: Props): JSX.Element => {
  return (
    <S.Container>
      <S.TextInput {...props} />
    </S.Container>
  );
};

const S = {
  Container: styled.View`
    width: 100%;
    margin-bottom: 24px;
    border-radius: 20px;
    border-color: #aeaeae;
    border-width: 1px;
  `,
  TextInput: styled.TextInput.attrs<Props>({
    placeholderTextColor: 'rgba(0,0,0,0.5)',
  })`
    padding: 20px;
    font-size: 14px;
    font-family: Poppins-Medium;
  `,
};

export default memo(Input);
