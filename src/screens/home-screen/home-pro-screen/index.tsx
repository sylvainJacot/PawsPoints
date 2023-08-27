import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner'

// Firebase
import {getAuth, signOut} from 'firebase/auth';

// Components


// Type

// Utils
// import UniqueCodeQR from '../../../components/qrcode';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import { get, getDatabase, ref } from 'firebase/database';


function HomeProScreen () {

  // States
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [item, setItem] = useState<string>('');

  const [clientData, setClientData] = useState<Object>({}); // To store client data
  const [showModal, setShowModal] = useState<Boolean>(false);

  // Const
  const { user } = useAuthentication();

  // Functions
  function onSuccess (e) {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  /*
  * Fetch CLient data
  */
  const fetchClientData = async (uid) => {
    // Update the proModeEnabled state as before
    const database = getDatabase();
    const cleanUid = uid.replace(/"/g, '');
    const userRef = ref(database, `users/${cleanUid}`);
    console.log('uid', uid);
    console.log("'users/' + uid", `users/${cleanUid}`);
   
   await get(userRef)
      .then((snapshot) => {
        const userData = snapshot.val() || {};
         console.log('userData', userData);
        setClientData(userData);
      })
      .catch((error) => {
        console.error('Error updating Pro Mode:', error);
      });
   
   };
   
  /*
  * Handle bar scan
  */
  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    console.log(`Scanned QR code with type ${type} and data ${data}`);
    if(data) {
      fetchClientData(data)
    }
  };

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
  
    // Function to handle adding the client
    const handleAddClient = () => {
      // Add the client to the card or perform any other necessary actions
      // You can implement this logic here
  
      // Close the modal
      setShowModal(false);
    };


  // Life Cycle
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  

    console.log('clientData state', clientData)

  return (
    <View style={styles.container}>
      <View style={styles.barCodeScannerContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      {/* Display client data and confirmation modal */}
         {clientData && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
          <View style={styles.modalContainer}>
            <Text>Client Name: {clientData?.name}</Text>
            <Text>Client Email: {clientData?.email}</Text>
            {/* Add more client data fields as needed */}
            <Button title="Add Client" onPress={handleAddClient} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </Modal>
      )}
          
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
    height: '60%'
  },
  modalContainer: {
    width: '100%',
    height: '60%'
  }
});