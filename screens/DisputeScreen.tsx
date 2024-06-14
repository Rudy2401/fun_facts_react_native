import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const DisputeScreen = ({navigation}) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const reasons = [
    'Incorrect information',
    'Misleading fact',
    'Offensive content',
    'Other',
  ];

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Dispute submitted for reason:', selectedReason, 'with additional info:', additionalInfo);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dispute Fun Fact</Text>
      {reasons.map((reason, index) => (
        <View key={index} style={styles.radioContainer}>
          <RadioButton
            value={reason}
            status={selectedReason === reason ? 'checked' : 'unchecked'}
            onPress={() => setSelectedReason(reason)}
          />
          <Text style={styles.radioLabel}>{reason}</Text>
        </View>
      ))}
      {selectedReason === 'Other' && (
        <TextInput
          style={styles.textInput}
          placeholder="Additional information"
          multiline
          numberOfLines={4}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
        />
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={!selectedReason}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DisputeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
