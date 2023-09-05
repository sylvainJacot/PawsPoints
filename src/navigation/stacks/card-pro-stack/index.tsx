import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens 
import CardCreationScreen from '../../../screens/card-pro-screen/card-creation-screen'
import CardProScreen from '../../../screens/card-pro-screen/index';

const Stack = createStackNavigator();

export default function CardProStack() {
  return (
      <Stack.Navigator

      >
        <Stack.Screen 
          name={"CardProScreen"} 
          component={CardProScreen} 
          options={{
            title: 'CardProScreen',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name={"CardCreation"} component={CardCreationScreen} />
      </Stack.Navigator>
  );
}