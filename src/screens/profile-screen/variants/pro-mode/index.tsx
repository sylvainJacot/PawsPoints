import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

// Firebase
import { get, getDatabase, ref, set } from 'firebase/database'; 

// Utils
import { useAuthentication } from '../../../../utils/hooks/useAuthentication';

// Types
import { proModeProps } from '../../../../types/pro-mode';

export default function ProfileScreenPro({ proMode, navigation }: { proMode: proModeProps, navigation: any }) {


   // Const
  const { user } = useAuthentication();
  const initiateActivityName = proMode?.activityName ?? '';
  // States
  const [activityName, setActivityName] = useState<string>(initiateActivityName);

  // Function
  
  const handleProMode = ({ activityName = '' }) => {
    const database = getDatabase(); // Get the database instance
  
    // First, fetch the existing user data
    const userRef = ref(database, `users/${user?.uid}`);
  
    get(userRef)
      .then((snapshot) => {
        const userData = snapshot.val() || {}; // Get existing data or an empty object if no data exists
  
        // Update the user's data with the new proMode data
        userData.proMode = {
          enabled: true,
          loyaltyCard: {}
        };
  
        // Set the updated data back to the database
        return set(userRef, userData);
      })
      .then(() => {
        console.log('User data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <View>
        <Input value={activityName} onChangeText={setActivityName} placeholder="Activity name" />
         <Button title="Update pro mode" onPress={() => handleProMode({activityName})} />

         {proMode?.enabled &&
           <Button 
          title="Edit card"
          style={styles.button} 
          onPress={() => navigation.navigate('CardCreation',  { proMode: proMode })} 
          />
        }
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
