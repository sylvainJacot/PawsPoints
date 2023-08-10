import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import UniqueCodeQR from '../qrcode';

const auth = getAuth();

export default function HomeScreen() {

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

      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
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