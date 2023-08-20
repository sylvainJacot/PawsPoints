import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// Firebase
import {getAuth, signOut} from 'firebase/auth';

// Components
import UniqueCodeQR from '../../components/qrcode';

// Type
import { StackScreenProps } from '@react-navigation/stack'; 
import { StackNavigationParamList } from '../../components/navigation/type';

// Utils
import { useAuthentication } from '../../utils/hooks/useAuthentication';


type HomeScreenProps = StackScreenProps<StackNavigationParamList, 'Home'>;

const auth = getAuth();

export default function HomeScreen({ navigation, route }: HomeScreenProps) {

  const { userData } = route.params;

  console.group('%c HomeScreen', 'color: white; background-color: #1B83A4; font-size: 15px');
  console.log('value', userData);
  console.groupEnd();

  const initialItemState ={
    name: 'Sugar',
  }

  const [item, setItem] = useState<{ name: string}>(initialItemState);

  const { user } = useAuthentication();

  useEffect(() => {

    if(user) {
      setItem({
        name: user.uid
      })
    }
  
  }, [user])
  

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <View>
        <UniqueCodeQR 
          uniqueCode={JSON.stringify({
            name: item.name,
           })}
        />
      </View>
      <Button 
      title="Profile"
       style={styles.button} 
       onPress={() => navigation.navigate('Profile',  {userData: userData })} />
      <Button 
        title="Sign Out" 
        style={styles.button} 
        onPress={async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.error('Error signing out:', error);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});
