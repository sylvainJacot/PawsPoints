// Context
import UserContext from 'context/user-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
// Firebase
import { getAuth, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Linking, Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
// Utils
import { useAuthentication } from 'utils/hooks/useAuthentication';
import { addClientToCard, checkClientLinking, fetchClientData, fetchLoyaltyCardData } from 'utils/services/firebase-services';






function HomeProScreen () {

  // States
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const [clientUniqueId, setClientUniqueId] = useState<String>('');
  const [clientData, setClientData] = useState<Object>({});
  const [loyaltyCardId, setLoyaltyCardId] = useState<Object>(''); 
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [isLinked, setIsLinked] = useState<Boolean>(false);

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
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(`Scanned QR code with type ${type} and data ${data}`);
  
    // Je reçois les données au scan
    if (data) {

      const getClientUniqueId = data.replace(/"/g, '');

      // Check if the client is already linked to a loyalty card
      const loyaltyCardId = await checkClientLinking(getClientUniqueId);

      if (loyaltyCardId) {
        // Fetch loyalty card data using loyaltyCardId
        const loyaltyCardData = await fetchLoyaltyCardData(loyaltyCardId);
        
        if(loyaltyCardData) {

          // Display the loyalty card data to the user
          setLoyaltyCardId(loyaltyCardId);
          setClientUniqueId(getClientUniqueId);
          setIsLinked(true);
        }
      } else {
        // If not linked, show the modal to add the client to the loyalty card
        setClientUniqueId(getClientUniqueId);
        setShowModal(true);

          const clientData = await fetchClientData(getClientUniqueId);
          if (clientData) {
            setClientData(clientData);
      
          }
        
      }
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
  // Function to handle adding the client
  const handleAddClient = async () => {
    if (clientUniqueId && loyaltyCardId) {
      const { profile } = clientData;

      const name = profile?.name || 'no name provided';
      const firstName = profile?.firstName || 'no firstName provided';

      // Assuming addClientToCard is an async function, await it.
      await addClientToCard(clientUniqueId, name, firstName, user?.uid, loyaltyCardId);

      // Close the modal
      setShowModal(false);
    }
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
  

  return (
    <View style={styles.container}>
      <View style={styles.barCodeScannerContainer}>
        {isLinked && <Text>IS LINKED !!!!</Text>}
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