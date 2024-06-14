import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMonument,
  faPalette,
  faLandmarkDome,
  faPotFood,
  faTree,
  faMapMarker,
  faFaceSunglasses,
} from '@fortawesome/pro-solid-svg-icons';
import {faThumbsUp, faBook, faMapPin} from '@fortawesome/pro-light-svg-icons';
import {Modalize} from 'react-native-modalize';

export default function MainScreen({navigation}: {navigation: any}) {
  const [landmarks, setLandmarks] = useState([]);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const modalizeRef = useRef(null);

  useEffect(() => {
    fetchLandmarks();
  }, []);

  const fetchLandmarks = async () => {
    try {
      const response = await fetch(
        'https://ab0krxrrb3.execute-api.us-east-1.amazonaws.com/prod/landmarks',
      );
      const data = await response.json();
      setLandmarks(data);
    } catch (error) {
      console.error('Error fetching landmarks: ', error);
    }
  };

  const handleSearchArea = () => {
    console.log('Search this area');
  };

  const handleMarkerPress = landmark => {
    setSelectedLandmark(landmark);
    modalizeRef.current?.open();
  };

  const getMarkerIcon = type => {
    switch (type) {
      case 'Art & Culture':
        return faPalette;
      case 'Historic Places':
        return faLandmarkDome;
      case 'Landmark':
        return faMonument;
      case 'Restaurants, Bars & Cafes':
        return faPotFood;
      case 'Cool & Unique':
        return faFaceSunglasses;
      case 'Parks & Gardens':
        return faTree;
      default:
        return faMapMarker;
    }
  };

  const getMarkerColor = type => {
    switch (type) {
      case 'Art & Culture':
        return 'purple';
      case 'Historic Places':
        return 'darkgreen';
      case 'Landmark':
        return 'indianred';
      case 'Restaurants, Bars & Cafes':
        return 'orange';
      case 'Cool & Unique':
        return 'teal';
      case 'Parks & Gardens':
        return 'green';
      default:
        return 'red';
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Leaderboard')}
          style={{marginRight: 10}}>
          <Icon name="leaderboard" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleModalPress = async () => {
    if (selectedLandmark) {
      modalizeRef.current?.close();
      try {
        const response = await fetch(
          `https://ab0krxrrb3.execute-api.us-east-1.amazonaws.com/prod/funFacts?landmarkId=${selectedLandmark.id}`,
        );
        const data = await response.json();
        navigation.navigate('LandmarkDetail', {
          landmark: selectedLandmark,
          details: data,
        });
      } catch (error) {
        console.error('Error fetching landmark details: ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 40.6933772,
          longitude: -73.9973992,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="mutedStandard">
        {landmarks.map(landmark => (
          <Marker
            key={landmark.id}
            coordinate={{
              latitude: parseFloat(landmark.coordinates.latitude),
              longitude: parseFloat(landmark.coordinates.longitude),
            }}
            onPress={() => handleMarkerPress(landmark)}>
            <FontAwesomeIcon
              icon={getMarkerIcon(landmark.type)}
              size={25}
              color={getMarkerColor(landmark.type)}
            />
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchArea}>
        <Text style={styles.searchButtonText}>Search this area</Text>
      </TouchableOpacity>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={styles.modal}
        handlePosition="inside">
        {selectedLandmark && (
          <TouchableOpacity
            style={styles.modalContent}
            onPress={handleModalPress}>
            <Image
              source={{uri: selectedLandmark.imageUrl}}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.landmarkName}>{selectedLandmark.name}</Text>
              <Text style={styles.category}>{selectedLandmark.type}</Text>
              <Text style={styles.address}>{selectedLandmark.address}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <FontAwesomeIcon icon={faThumbsUp} size={20} color="green" />
                  <Text style={styles.statText}>{selectedLandmark.likes}</Text>
                </View>
                <View style={styles.stat}>
                  <FontAwesomeIcon icon={faBook} size={20} color="brown" />
                  <Text style={styles.statText}>{selectedLandmark.numOfFunFacts}</Text>
                </View>
                <View style={styles.stat}>
                  <FontAwesomeIcon icon={faMapPin} size={20} color="red" />
                  <Text style={styles.statText}>1.2 miles</Text>
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={getMarkerIcon(selectedLandmark.type)}
                size={20}
                color={getMarkerColor(selectedLandmark.type)}
              />
            </View>
          </TouchableOpacity>
        )}
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchButton: {
    position: 'absolute',
    top: 10,
    height: 30,
    width: 125,
    backgroundColor: 'green',
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 13,
    color: 'white',
  },
  modal: {
    margin: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalContent: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  landmarkName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
    marginRight: 30,
  },
  statText: {
    fontSize: 12,
    color: 'gray',
  },
  iconContainer: {
    right: 5,
    top: 5,
    bottom: 5,
  },
});

export default MainScreen;
