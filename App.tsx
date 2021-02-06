import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import MainNavigation from './src/MainNavigation';

export default function App() {
  const [loaded] = useFonts({
    LeituraNews: require('./assets/fonts/LeituraNews.ttf'),
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <MainNavigation />
      <StatusBar style="auto" />
    </>
  );
}
