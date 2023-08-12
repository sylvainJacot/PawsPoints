import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens 
import WelcomeScreen from '../screens/Welcome';
import SignOutScreen from '../screens/SignUpScreen';

// Types
import { StackNavigationParamList } from './type';

const Stack = createStackNavigator<StackNavigationParamList>();

export default function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
        <Stack.Screen name={'SignUp'} component={SignOutScreen} />
      </Stack.Navigator>
  );
}