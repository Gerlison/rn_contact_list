import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import MainNavigation from './src/MainNavigation';
import styled from 'styled-components';

const App = (): JSX.Element => {
  const [loaded] = useFonts({
    LeituraNews: require('./assets/fonts/LeituraNews.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return <></>;
  }

  return (
    <>
      <S.SafeArea />
      <StatusBar style="auto" />
      <MainNavigation />
    </>
  );
};

const S = {
  SafeArea: styled(SafeAreaView)`
    background-color: #fef983;
  `,
};

export default App;
