import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListScreen from './screens/ListScreen';
import FormScreen from './screens/FormScreen';

import { Contact } from './types';

export type RootStackParams = {
  ListScreen: undefined;
  FormScreen: {
    contactToEdit?: Contact;
  };
};

const Stack = createStackNavigator<RootStackParams>();

const MainNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="FormScreen" component={FormScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigation;
