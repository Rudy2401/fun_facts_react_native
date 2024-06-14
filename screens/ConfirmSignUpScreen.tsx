import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
import {Auth} from 'aws-amplify';

export default function ConfirmSignUpScreen({route, navigation}: {route: any; navigation: any}) {
  const {username} = route.params;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleConfirmSignUp = async () => {
    setError('');
    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate('Login');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Confirmation Code"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Confirm" onPress={handleConfirmSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
