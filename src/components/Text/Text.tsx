import React, { memo } from 'react';
import { TextProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type FontFamily = 'Poppins-Regular' | 'Poppins-Medium' | 'Poppins-SemiBold';

interface DefaultTextProps {
  family: FontFamily;
  size: number;
  color: string;
}

export interface Props extends TextProps {
  variant?: FontFamily;
  size?: number;
  color?: string;
  children: React.ReactNode;
}

const Text = ({ children, variant, size, color, ...props }: Props): JSX.Element => (
  <S.DefaultText
    {...props}
    family={variant || 'Poppins-Regular'}
    size={size || 16}
    color={color || '#2f2f2f'}
  >
    {children}
  </S.DefaultText>
);

export const S = {
  DefaultText: styled.Text<DefaultTextProps>`
    ${({ family, size, color }) => css`
      font-family: ${family};
      font-size: ${size}px;
      color: ${color};
    `}
  `,
};

export default memo(Text);
