import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';


// Sceens
import HomeScreen from '../../screens/home-screen';
import ProfileScreen from '../../screens/profile-screen';
import UserContext from '../../context/user-context';

const Stack = createStackNavigator();

export default function UserStack() {

  const { userData } = useContext(UserContext);


  console.group('%c UserStack', 'color: white; background-color: #1B83A4; font-size: 15px');
  console.log('userData', userData);
  console.groupEnd();

  return (
    userData ? 
      <Stack.Navigator>
        <Stack.Screen 
          name={'Home'} 
          component={HomeScreen} 
          initialParams={{ userData: userData && userData }}
          />
        <Stack.Screen name={'Profile'} component={ProfileScreen} initialParams={{ userData: userData && userData }}/>
      </Stack.Navigator>
      : null
  );
}