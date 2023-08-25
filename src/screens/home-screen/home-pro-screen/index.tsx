import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner'

// Firebase
import {getAuth, signOut} from 'firebase/auth';

// Components


// Type

// Utils
// import UniqueCodeQR from '../../../components/qrcode';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';


function HomeProScreen () {

  // States
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [item, setItem] = useState<string>('');
  const { user } = useAuthentication();

  function onSuccess (e) {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };



  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
  // useEffect(() => {
  //   if(user) {
  //     setItem( user.uid )
  //   }
  //   () => {
  //     setItem('');
  //   }
  // }, [user])
  

  return (
    <View style={styles.container}>
      <View style={styles.barCodeScannerContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          
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
  },
  barCodeScannerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,122,255)'
  },
  absoluteFillObject: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});