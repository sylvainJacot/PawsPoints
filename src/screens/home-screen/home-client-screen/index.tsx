// Firebase
import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
// Components
// Type
// Utils
import UniqueCodeQR from '../../../components/qrcode';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';




function HomeClientScreen () {

  // States
  const [userQrCodeData, setUserQrCodeData] = useState<Object>({});
  const [item, setItem] = useState<string>('');
  const { user } = useAuthentication();

  // Functions
  /*
  * SignOUt
  */
  async function handleSignOut () {
    const auth = getAuth();

      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error signing out:', error);
      }
  }
  useEffect(() => {
    if(user) {
      setItem( user.uid )
    }
    () => {
      setItem('');
    }
  }, [user])
  

  return (
    <View style={styles.container}>
      <View>
          <Text>{item}</Text>
        <UniqueCodeQR  uniqueCode={JSON.stringify(item)}/>
      </View>
      <Button 
        title="Sign Out" 
        style={styles.button} 
        onPress={() => handleSignOut()}
      />
    </View>
  );
}

export default HomeClientScreen;

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