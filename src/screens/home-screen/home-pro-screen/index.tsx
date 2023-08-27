import { BarCodeScanner } from 'expo-barcode-scanner';
// Firebase
import { getAuth, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Linking, Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
// Components
import UserContext from '../../../context/user-context';
import { useAuthentication } from '../../../utils/hooks/useAuthentication';
import { addClientToCard, fetchClientData } from '../../../utils/services/firebase-services';




function HomeProScreen () {

  // States
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState<boolean>(false);

  const [clientUniqueId, setClientUniqueId] = useState<String>('');
  const [clientData, setClientData] = useState<Object>({});
  const [loyaltyCardId, setLoyaltyCardId] = useState<Object>(''); 
  const [showModal, setShowModal] = useState<Boolean>(false);

  // Const
  const { userData } = useContext(UserContext);
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

   
  /*
  * Handle bar scan
  */
  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    console.log(`Scanned QR code with type ${type} and data ${data}`);
    if(data) {
      fetchClientData(data, setClientData)
      setClientUniqueId(data.replace(/"/g, ''));
      setShowModal(true)
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
      const { profile } = clientData;
      const { name, firstName} = profile;
       addClientToCard( clientUniqueId, name, firstName, user?.uid, loyaltyCardId)
  
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

  useEffect(() => {
    if(userData?.proMode?.loyaltyCard) {
      setLoyaltyCardId(userData?.proMode?.loyaltyCard?.id);
    }
  }, [userData])

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  

  console.group('%c STATE', 'color: white; background-color: #1B83A4; font-size: 15px');
  console.log('clientData from component:', clientData);
  console.groupEnd();

  return (
    <View style={styles.container}>
      <View style={styles.barCodeScannerContainer}>
        {!showModal &&
              <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          }
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      {/* Display client data and confirmation modal */}
         {clientData && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Client Name: {clientData?.profile?.name}</Text>
            <Text>Client Email: {clientData?.profile?.email}</Text>
            {/* Add more client data fields as needed */}
            <Button title={`Add Client on loyaltyCardId ${loyaltyCardId}?`} onPress={handleAddClient} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
            </View>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});