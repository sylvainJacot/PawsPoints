import React from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// if (Platform.OS === 'android' || Platform.OS === 'ios') {
//   GoogleSignin.configure({
//     webClientId: Constants.expoConfig?.extra?.firebaseGoogleAuthIdClientWeb,
//   });
// }

const authentication = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })
  

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(authentication, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  // async function signUpWithGoogle() {
  //   if (Platform.OS === 'android' || Platform.OS === 'ios') {
  // // Check if your device supports Google Play
  // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // // Get the users ID token
  // const { idToken } = await GoogleSignin.signIn();

  // // Create a Google credential with the token
  // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // // Sign-in the user with the credential
  // return auth().signInWithCredential(googleCredential);
  //   }
  //   else {
  //     // Use Firebase Authentication for web
  //     const auth = getAuth();
  //     const provider = new GoogleAuthProvider();
  //     try {
  //       const result = await signInWithPopup(auth, provider);
  //       // Handle the result on successful authentication
  //     } catch (error) {
  //       // Handle authentication error
  //     }
  //   }

  // }

  console.group('%c STATE', 'color: white; background-color: #1B83A4; font-size: 15px');
  console.log('Platform.OS ', Platform.OS );
  console.groupEnd();

  return (
    <View style={styles.container}>
      <Text>Signup screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
      <Text>or {Platform.OS}</Text>
      <TouchableOpacity style={styles.googleButton}>
            <Image
            style={styles.googleIcon}
            source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
            }}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10
  },

  googleButton: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
   },
   googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600'
   },
   googleIcon: {
    height: 24,
    width: 24
   },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;