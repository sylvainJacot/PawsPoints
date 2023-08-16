import React, { useState } from 'react';

// Types
import { StackScreenProps } from '@react-navigation/stack'; 
import { StackNavigationParamList } from '../../components/navigation/type';

// Component
import ProfileScreenClient from './variants/client-mode';
import ProfileScreenPro from './variants/pro-mode';
import { View } from 'react-native';
import { Button, Switch, Text, Input } from 'react-native-elements';

// Firebase
import { getDatabase, ref, set } from 'firebase/database'; 

// Utils
import { useAuthentication } from '../../utils/hooks/useAuthentication';


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

    const handleSaveProfile = ({ name='', firstName='', phoneNumber='', email='' }) => {
  
      const database = getDatabase(); // Get the database instance

        set(ref(database, `users/${user?.uid}`), { name, firstName, phoneNumber, email }) // Update the user's data
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
      <Text>Edite Profil</Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={firstName} onChangeText={setFirstName} placeholder="First Name" />
      <Input value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />


      <Button title="Save" onPress={() => handleSaveProfile({ name, firstName, phoneNumber, email })} />
      <Text>Change mode : </Text>
      <Switch value={isProMode} onValueChange={handleSwitchToProMode} />
    </View>
      {isProMode ? <ProfileScreenPro /> : null}
      {isClientMode ? <ProfileScreenClient /> : null}
    </React.Fragment>
  );
}
