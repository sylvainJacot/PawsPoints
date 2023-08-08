import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>

      <View style={styles.buttons}>
        <Button title="Login" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
        <Button title="Register" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />
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

  buttons: {
    flex: 1,
  },

  button: {
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
   }
});

export default WelcomeScreen;