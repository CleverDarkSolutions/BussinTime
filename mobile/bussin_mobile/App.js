import tw from 'twrnc'

import WelcomeScreen from './screens/welcome_page/WelcomeScreen';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigaror';
import { SessionProvider } from './screens/app/SessionContext';

export default function App() {
  return(
    <SessionProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </SessionProvider>
  )
}