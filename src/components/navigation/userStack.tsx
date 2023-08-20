import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Sreens
import HomeScreen from '../../screens/home-screen';
import ProfileScreen from '../../screens/profile-screen';
import UserContext from '../../context/user-context';
import CardCreation from '../../screens/card-creation-screen';
import { userDataProps } from '../../types/user-data';

function UserStack() {

  const Stack = createStackNavigator();
  const { userData } = useContext(UserContext);

  return (
    userData ? 
      <Stack.Navigator>
        <Stack.Screen 
          name={'Home'} 
          component={HomeScreen} 
          initialParams={{ userData: userData as userDataProps }}
          />
        <Stack.Screen name={'Profile'} component={ProfileScreen} initialParams={{ userData: userData as userDataProps  }}/>
        <Stack.Screen name={'CardCreation'} component={CardCreation} initialParams={{ proMode: userData?.proMode }}/>
      </Stack.Navigator>
      : null
  );
}

export default UserStack;