import React, { memo } from 'react';
import styled from 'styled-components/native';

type FontFamily = 'Poppins-Regular' | 'Poppins-Medium' | 'Poppins-SemiBold';

interface DefaultTextProps {
  family: FontFamily;
  size: number;
  color: string;
}

export interface Props {
  variant?: FontFamily;
  size?: number;
  color?: string;
  children: React.ReactNode;
}

const Text = ({ children, variant, size, color }: Props): JSX.Element => (
  <S.DefaultText
    family={variant || 'Poppins-Regular'}
    size={size || 16}
    color={color || '#2f2f2f'}
  >
    {children}
  </S.DefaultText>
);

export const S = {
  DefaultText: styled.Text<DefaultTextProps>``,
};

export default memo(Text);
