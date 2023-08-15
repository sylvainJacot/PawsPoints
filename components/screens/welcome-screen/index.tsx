/*
* Vendors 
*/
import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Input, Button } from 'react-native-elements';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

// Types
import { StackNavigationParamList } from '../../navigation/type';
import { auth } from '../../../config/firebase';

// Utils
import { isEmailValid, isPasswordValid } from '../../../utils/forms'


type WelcomeScreenProps = StackScreenProps<StackNavigationParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {

    // CONST
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
      })

    // FUNCTIONS

    /*
    * LOGIN function
    */
    async function logIn() {
        if (value.email === '' || value.password === '') {
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
          return;
        }
        if (!isEmailValid(value.email)) {
          setValue({
            ...value,
            error: 'Please enter a valid email address.'
          });
          return;
        }
      
        if (!isPasswordValid(value.password)) {
          setValue({
            ...value,
            error: 'Password must be at least 6 characters long.'
          });
          return;
        }
    
        try {
          await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
          setValue({
            ...value,
            error: error.message,
          })
        }
      }

  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>

      <View style={styles.LoginSection}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
          {value.error && !isEmailValid(value.email) && (
            <Text>{value.error}</Text>
          )}

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />
          {value.error && !isPasswordValid(value.password) && (
            <Text>{value.error}</Text>
          )}

        <Button title="Login" buttonStyle={styles.control} onPress={logIn} />
      </View>

      <View style={styles.buttons}>
        <Button title="Create account" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    LoginSection:{
        flex: 1,
        width: '80%'
    },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control:{
    marginTop: 10
  },
  buttons: {
    flex: 1,
  },
  button: {
    marginTop: 10
  }
});

export default WelcomeScreen;