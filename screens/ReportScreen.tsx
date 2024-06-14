import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const ReportScreen = ({navigation}) => {
  const [selectedReason, setSelectedReason] = useState(null);

  const reasons = [
    'Inappropriate content',
    'False information',
    'Spam',
    'Other',
  ];

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Report submitted for reason:', selectedReason);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Report Fun Fact</Text>
      <RadioButton.Group
        onValueChange={(value) => setSelectedReason(value)}
        value={selectedReason}>
        {reasons.map((reason, index) => (
          <View key={index} style={styles.radioContainer}>
            <RadioButton
              value={reason}
              status={selectedReason === reason ? 'checked' : 'unchecked'}
              onPress={() => setSelectedReason(reason)}
              color="blue"
              uncheckedColor="gray"
            />
            <Text style={styles.radioLabel}>{reason}</Text>
          </View>
        ))}
      </RadioButton.Group>
      <TouchableOpacity
        style={[
          styles.submitButton,
          !selectedReason && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!selectedReason}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportScreen;

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
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: 'gray',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
