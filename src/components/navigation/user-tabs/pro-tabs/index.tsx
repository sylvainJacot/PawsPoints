import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProfileScreen from '../../../../screens/profile-screen';
import CardCreation from '../../../../screens/card-creation-screen';
import HomeProScreen from '../../../../screens/home-screen/home-pro-screen';


function ProTabs() {

  const Tab = createBottomTabNavigator();
  
  return (
      <Tab.Navigator>
         <Tab.Screen name={'CardCreation'} component={CardCreation}/>
        <Tab.Screen  name={'HomeProScreen'} component={HomeProScreen} />
        <Tab.Screen name={'Profile'} component={ProfileScreen}/>
      </Tab.Navigator>
  );
}

export default ProTabs;