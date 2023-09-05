import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProfileScreen from '../../../screens/profile-screen';
import CardCreation from '../../../screens/card-pro-screen/card-creation-screen';
import HomeClientScreen from '../../../screens/home-screen/home-client-screen';


function ClientTabs() {

  const Tab = createBottomTabNavigator();
  
  return (
      <Tab.Navigator>
        <Tab.Screen name={'Profile'} component={ProfileScreen}/>
        <Tab.Screen  name={'HomeClientScreen'} component={HomeClientScreen} />
        <Tab.Screen name={'CardCreation'} component={CardCreation}/>
      </Tab.Navigator>
  );
}

export default ClientTabs;