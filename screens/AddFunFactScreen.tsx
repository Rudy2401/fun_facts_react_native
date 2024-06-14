import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMonument,
  faPalette,
  faLandmarkDome,
  faPotFood,
  faTree,
  faFaceSunglasses,
} from '@fortawesome/pro-solid-svg-icons';
import * as ImagePicker from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const categories = [
  {name: 'Art & Culture', icon: faPalette, color: 'purple'},
  {name: 'Historic Places', icon: faLandmarkDome, color: 'darkgreen'},
  {name: 'Landmark', icon: faMonument, color: 'indianred'},
  {name: 'Restaurants, Bars & Cafes', icon: faPotFood, color: 'orange'},
  {name: 'Cool & Unique', icon: faFaceSunglasses, color: 'teal'},
  {name: 'Parks & Gardens', icon: faTree, color: 'green'},
];

export default function AddFunFactScreen({navigation}) {
  const [landmarkName, setLandmarkName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [source, setSource] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      'Confirm Submission',
      'Are you sure you want to submit this fun fact?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Submit',
          onPress: () => {
            console.log('Fun fact submitted');
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handlePickImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.assets) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.title}>Add New Fun Fact</Text>
          <GooglePlacesAutocomplete
            placeholder="Search for a landmark"
            onPress={(data, details = null) => {
              setLandmarkName(data.description);
              setAddress(details.formatted_address);
            }}
            query={{
              key: 'AIzaSyDvO0whNKBx0to8V5PK1POKEk6c2otSjtI',
              language: 'en',
            }}
            styles={{
              textInputContainer: styles.placesInputContainer,
              textInput: styles.placesInput,
              listView: styles.placesListView,
              predefinedPlacesDescription: styles.placesDescription,
            }}
            fetchDetails={true}
          />
          <TextInput
            placeholder="Address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            editable={false}
          />
          <Text style={styles.subtitle}>Select Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  category === cat.name && styles.categoryButtonSelected,
                ]}
                onPress={() => setCategory(cat.name)}>
                <FontAwesomeIcon icon={cat.icon} size={30} color={cat.color} />
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="Fun Fact Description"
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handlePickImage}
            style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Select Image</Text>
          </TouchableOpacity>
          {image && <Image source={{uri: image}} style={styles.image} />}
          <TextInput
            placeholder="Source (URL or other)"
            style={styles.input}
            value={source}
            onChangeText={setSource}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      renderItem={null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    height: 40,
    fontSize: 14,
  },
  textArea: {
    height: 100,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 8,
    width: '30%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryButtonSelected: {
    backgroundColor: 'lightgray',
    transform: [{scale: 1.1}],
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    marginVertical: 8,
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'green',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'darkgrey',
  },
  submitButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  placesInputContainer: {
    borderWidth: 1,
    borderColor: '#f8f8f8',
    borderRadius: 10,
  },
  placesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    fontSize: 14,
  },
  placesListView: {
    zIndex: 1,
  },
  placesDescription: {
    fontSize: 16,
  },
});
