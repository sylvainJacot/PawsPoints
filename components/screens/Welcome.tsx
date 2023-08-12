import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Input, Button, Icon } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Types
import { StackNavigationParamList } from '../navigation/type';

const auth = getAuth();

type WelcomeScreenProps = StackScreenProps<StackNavigationParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
      })

    async function logIn() {
        if (value.email === '' || value.password === '') {
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
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