import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

// Firebase
import {getAuth, signOut} from 'firebase/auth';

// Components

// Type

// Utils
// import UniqueCodeQR from '../../../components/qrcode';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';


function HomeProScreen () {

  // States
  const [item, setItem] = useState<string>('');
  const { user } = useAuthentication();

  function onSuccess (e) {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

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
      {/* <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      /> */}
          
        {/* <UniqueCodeQR  uniqueCode={JSON.stringify({ name: item})}/> */}
      </View>
      <Button 
        title="Sign Out" 
        style={styles.button} 
        onPress={() => handleSignOut()}
      />
    </View>
  );
}

export default HomeProScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});