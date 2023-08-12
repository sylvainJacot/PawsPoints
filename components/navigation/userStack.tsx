import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


// Sceens
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/profile-screen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Profile'} component={ProfileScreen} />
      </Stack.Navigator>
  );
}