import React from 'react';
import {View, Button, StyleSheet, Text, Alert} from 'react-native';
import {Auth} from 'aws-amplify';

export default function LoginScreen({navigation}) {
  const handleLogin = async method => {
    try {
      if (method === 'Google') {
        console.log('Logging in with Google');
        // Perform Google sign-in
        await Auth.federatedSignIn({provider: 'Google'});
      } else {
        console.log(`Logging in with ${method}`);
        // Perform login for other methods here
        navigation.replace('Main');
      }
    } catch (error) {
      console.error(`Error signing in with ${method}`, error);
      Alert.alert(
        'Error',
        `Error signing in with ${method}. Please try again.`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login with Google"
          onPress={() => handleLogin('Google')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login with Facebook"
          onPress={() => handleLogin('Facebook')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login with Email" onPress={() => handleLogin('Email')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Continue as Guest"
          onPress={() => handleLogin('Guest')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 8,
  },
});
