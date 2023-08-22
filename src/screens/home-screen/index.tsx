import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// Firebase
import {getAuth, signOut} from 'firebase/auth';

// Components
import UniqueCodeQR from '../../components/qrcode';

// Type
import { HomeScreenProps } from '../../types/screens/home-screen';

// Utils
import { useAuthentication } from '../../utils/hooks/useAuthentication';


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {

  // States
  const [item, setItem] = useState<string>('');
  const { user } = useAuthentication();

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
      <Text>Welcome {user?.email}!</Text>
      <View>
        <UniqueCodeQR  uniqueCode={JSON.stringify({ name: item})}/>
      </View>
      <Button 
      title="Profile"
       style={styles.button} 
       onPress={() => navigation.navigate('Profile')} />
      <Button 
        title="Sign Out" 
        style={styles.button} 
        onPress={() => handleSignOut()}
      />
    </View>
  );
}

export default HomeScreen;

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
