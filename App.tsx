import React, { useReducer } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import MainNavigation from './src/MainNavigation';
import { appContext, reducer } from './src/context';


const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { contacts: [] });

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
      <appContext.Provider value={[state, dispatch ]}>
        <MainNavigation />
      </appContext.Provider>
    </>
  );
};

const S = {
  SafeArea: styled(SafeAreaView)`
    background-color: #fef983;
  `,
};

export default App;
