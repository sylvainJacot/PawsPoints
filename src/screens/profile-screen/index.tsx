import React, { useState } from 'react';

// Types
import { ProfileScreenNavigationProps } from '../../types/screens/profile-screen';

// Component
import ProfileScreenClient from './variants/client-mode';
import { View } from 'react-native';
import { Button, Switch, Text, Input } from 'react-native-elements';

// Firebase
import { get, getDatabase, ref, set } from 'firebase/database'; 

// Utils
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import ProfileScreenPro from './variants/pro-mode';


export default function ProfileScreen({ route }: ProfileScreenNavigationProps) {

    // Props
    const { userData } = route.params;

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
    
  return (
    <React.Fragment>
          <View>
      <Text>Edite Profil</Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={firstName} onChangeText={setFirstName} placeholder="First Name" />
      <Input value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
       <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />


      <Button title="Save" onPress={() => handleSaveProfile({ name, firstName, phoneNumber, email, password })} />
      <Text>Change mode : </Text>
      {/* <Switch value={isProMode} onValueChange={handleSwitchToProMode} /> */}
    </View>
      <ProfileScreenPro proMode={userData?.proMode}/>
      <ProfileScreenClient />
    </React.Fragment>
  );
}
