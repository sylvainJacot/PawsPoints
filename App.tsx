import React from 'react';
import { ThemeProvider } from 'react-native-elements';

// Firebase
import './config/firebase';

import RootNavigation from './components/navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}