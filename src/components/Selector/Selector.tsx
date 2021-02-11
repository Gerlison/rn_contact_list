import React, { memo, useMemo, useState } from 'react';
import { PickerProps } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

import Text from '../Text';

import icArrow from '../../../assets/icons/icArrow.png';

interface Props extends PickerProps {
  isLoading: boolean;
  items: {
    label: string;
    value: string;
  }[];
}

const Selector = ({ items, isLoading, ...props }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const renderPickerItems = useMemo(() => {
    if (isLoading)
      return (
        <Picker.Item
          testID="selector loading"
          color="#a3a3a3"
          value="loading"
          label="Loading..."
        />
      );

    return items.map((item) => (
      <Picker.Item
        testID="selector item"
        key={item.value}
        label={item.label}
        value={item.value}
      />
    ));
  }, [isLoading, items]);

  return (
    <>
      {isOpen && (
        <S.Backdrop
          testID="selector backdrop"
          onPress={() => setIsOpen(false)}
        />
      )}
      <S.Container testID="selector">
        <S.Touchable
          testID="selector touchable"
          isOpen={isOpen}
          onPress={() => setIsOpen((old) => !old)}
        >
          <Text
            size={14}
            variant="Poppins-Medium"
            color={props.selectedValue ? '#000' : 'rgba(0,0,0,.5)'}
          >
            {props.selectedValue || 'City'}
          </Text>
          <S.Image isOpen={isOpen} source={icArrow} />
        </S.Touchable>
        {isOpen && (
          <Picker
            testID="selector picker"
            enabled={!isLoading}
            itemStyle={ITEM_STYLE}
            {...props}
          >
            {renderPickerItems}
          </Picker>
        )}
      </S.Container>
    </>
  );
};

const S = {
  Backdrop: styled.TouchableOpacity`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  `,
  Container: styled.View`
    width: 100%;
    margin-bottom: 24px;
    border-radius: 20px;
    border-color: #aeaeae;
    border-width: 1px;
  `,
  Touchable: styled.TouchableOpacity<{ isOpen: boolean }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: ${({ isOpen }) => (isOpen ? 0 : 20)}px;
  `,
  Image: styled.Image.attrs({
    resizeMode: 'contain',
  })<{ isOpen: boolean }>`
    height: 12px;
    transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  `,
};

const ITEM_STYLE = { fontFamily: 'Poppins-Medium', fontSize: 16 };

export default memo(Selector);
