import React, { useState, useEffect, useContext} from 'react';

// Component
import { View } from 'react-native';
import { Button, Switch, Text, Input } from 'react-native-elements';

// Firebase
import { get, getDatabase, ref, set } from 'firebase/database'; 

// Utils
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import ProfileScreenPro from './variants/pro-mode';
import UserContext from '../../context/user-context';


export default function ProfileScreen () {

    // Context
    const userContext = useContext(UserContext);
    const { userData, watchUserData } = userContext 

    const initialName = userData?.profile?.name ?? ''; 
    const initialFirstName = userData?.profile?.firstName ?? '';
    const initialPhoneNumber = userData?.profile?.phoneNumber ?? '';
    const initialEmail = userData?.profile?.email ?? '';

    // State
    const [name, setName] = useState<string>(initialName);
    const [firstName, setFirstName] = useState<string>(initialFirstName);
    const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
    const [email, setEmail] = useState<string>(initialEmail);
    const [password, setPassword] = useState<string>('');
    const [proModeEnabled, setProModeEnabled] = useState<boolean>(userData?.proMode?.enabled || false);
    

    const { user } = useAuthentication();

    const handleSaveProfile = ({ name = '', firstName = '', phoneNumber = '', email = '', password = '' }) => {
      const userId = user?.uid; // Assuming user is declared somewhere above
    
      const database = getDatabase();
      const userRef = ref(database, `users/${userId}`);
    
      if (userRef && userId) {
        if (auth.currentUser) {
          const currentUser = auth.currentUser; // Declare currentUser here
          const currentUserEmail = currentUser.email; // Access email from currentUser
    
          if (email !== currentUserEmail) {
            updateEmail(currentUser, email)
              .then(() => {
                console.log('email updated')
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
          }
    
          if (!!password) {
            updatePassword(currentUser, password)
              .then(() => {
                console.log('password updated')
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
          }
        }
    
        get(userRef)
          .then((snapshot) => {
            const userData = snapshot.val() || {}; // Get existing data or an empty object if no data exists
    
            // Update the user's data with the new profile data
            userData.profile = {
              name,
              firstName,
              phoneNumber,
              email,
            };
            return set(userRef, userData);
          })
          .catch((error) => {
            console.error('Error updating user profile:', error);
          });
      }
    };

  
    const toggleProMode = () => {
      // Update the proModeEnabled state as before
      const userId = user?.uid;
      const database = getDatabase();
      const userRef = ref(database, `users/${userId}`);
  
      get(userRef)
        .then((snapshot) => {
          const userData = snapshot.val() || {};
  
          userData.proMode = {
            enabled: !proModeEnabled
          };
  
          return set(userRef, userData);
        })
        .then(() => {
          setProModeEnabled(!proModeEnabled);
        })
        .catch((error) => {
          console.error('Error updating Pro Mode:', error);
        });
    };


    useEffect(() => {
      watchUserData();
    }, [proModeEnabled]); 
    
  return (
    <React.Fragment>
          <View>
          <Text>Set pro mode as default</Text>
          <Switch value={proModeEnabled} onValueChange={toggleProMode} /> 
      <Text>Edite Profil</Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={firstName} onChangeText={setFirstName} placeholder="First Name" />
      <Input value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
       <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />

      <Button title="Save" onPress={() => handleSaveProfile({ name, firstName, phoneNumber, email, password })} />
    </View>
      {proModeEnabled && <ProfileScreenPro proMode={userData?.proMode}/>}
    </React.Fragment>
  );
}
