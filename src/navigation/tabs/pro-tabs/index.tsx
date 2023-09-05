import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProfileScreen from '../../../screens/profile-screen';
import CardProStack from '../../stacks/card-pro-stack';
import HomeProScreen from '../../../screens/home-screen/home-pro-screen';


function ProTabs() {

  const Tab = createBottomTabNavigator();
  
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
         <Tab.Screen name={'CardProStack'} component={CardProStack}/>
        <Tab.Screen  name={'HomeProScreen'} component={HomeProScreen} />
        <Tab.Screen name={'Profile'} component={ProfileScreen}/>
      </Tab.Navigator>
  );
}

export default ProTabs;