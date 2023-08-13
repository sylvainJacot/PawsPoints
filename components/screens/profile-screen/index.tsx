import React, { useState } from 'react';

// Types
import { StackScreenProps } from '@react-navigation/stack'; 
import { StackNavigationParamList } from '../../navigation/type';

// Component
import ProfileScreenClient from './variants/client-mode';
import ProfileScreenPro from './variants/pro-mode';
import { TextInput, View } from 'react-native';
import { Button, Switch, Text } from 'react-native-elements';

// Firebase
import { getDatabase, ref, update } from 'firebase/database'; 

// Utils
import { useAuthentication } from '../../../utils/hooks/useAuthentication';


type ProfileScreenNavigationProps = StackScreenProps<StackNavigationParamList, 'Profile'>;

export default function ProfileScreen({ route }: ProfileScreenNavigationProps) {

    const { isProMode: initialIsProMode, isClientMode } = route.params;

    const [isProMode, setIsProMode] = useState<boolean>(initialIsProMode);
    const [name, setName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  

    const { user } = useAuthentication();

    const handleSaveProfile = () => {
      const userData = {
        name,
        firstName,
        phoneNumber,
        email,
        // Any other fields you want to update/add
      };
  
      const database = getDatabase(); // Get the database instance
      update(ref(database, `users/${user?.uid}`), userData) // Update the user's data
        .then(() => {
          console.log('User data updated successfully');
        })
        .catch(error => {
          console.error('Error updating user data:', error);
        });
    };
  
  
    const handleSwitchToProMode = () => {
      // Implement logic to update user's mode in the database
      setIsProMode(!isProMode);
    };

  return (
    <React.Fragment>
          <View>
      <Text>Edit Profile</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput value={firstName} onChangeText={setFirstName} placeholder="First Name" />
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />


      <Button title="Save" onPress={handleSaveProfile} />
      <Text>Change mode : </Text>
      <Switch value={isProMode} onValueChange={handleSwitchToProMode} />
    </View>
      {isProMode ? <ProfileScreenPro /> : null}
      {isClientMode ? <ProfileScreenClient /> : null}
    </React.Fragment>
  );
}
