import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// Firebase
import {getAuth, signOut} from 'firebase/auth';

// Components
import UniqueCodeQR from '../../qrcode';

// Type
import { StackScreenProps } from '@react-navigation/stack'; 
import { StackNavigationParamList } from '../../navigation/type';

// Utils
import { useAuthentication } from '../../../utils/hooks/useAuthentication';

type HomeScreenProps = StackScreenProps<StackNavigationParamList, 'Home'>;

const auth = getAuth();

export default function HomeScreen({ navigation }: HomeScreenProps) {

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
      <Text>Your uuid is {item.name}!</Text>
      <Text>type of {typeof item.name}!</Text>
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
       onPress={() => navigation.navigate('Profile', {
                isProMode: true,
                isClientMode: false, 
              })} />
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