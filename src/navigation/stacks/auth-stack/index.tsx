import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens 
import WelcomeScreen from '../../../screens/welcome-screen';
import SignUpScreen from '../../../screens/signup-screen';

// Types
import { StackNavigationParamList } from '../../type';

const Stack = createStackNavigator<StackNavigationParamList>();

export default function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
        <Stack.Screen name={"SignUp"} component={SignUpScreen} />
      </Stack.Navigator>
  );
}