import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faThumbsUp,
  faShareAll,
  faTriangleExclamation,
  faFlag,
} from '@fortawesome/pro-light-svg-icons';
import {faThumbsUp as faThumbsUpSolid} from '@fortawesome/pro-solid-svg-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;

const LandmarkDetailScreen = ({route, navigation}) => {
  const {landmark, details} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: landmark.name,
      headerRight: () => (
        <View style={{flexDirection: 'row', marginRight: 10}}>
          <TouchableOpacity style={{marginHorizontal: 10}}>
            <Icon name="more-vert" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleReport = (funFactId) => {
    navigation.navigate('Report', {funFactId});
  };

  const handleDispute = (funFactId) => {
    navigation.navigate('Dispute', {funFactId});
  };

  // set state for the like button
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        index={currentIndex}
        onIndexChanged={index => setCurrentIndex(index)}
        showsPagination={false}>
        {details.map((funFact, index) => (
          <View key={index} style={styles.swipeContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.card}>
                <Image source={{uri: funFact.imageUrl}} style={styles.image} />
                {funFact.imageCaption ? (
                  <Text style={styles.imageCaption}>{funFact.imageCaption}</Text>
                ) : null}
                {funFact.title ? (
                  <Text style={styles.imageTitle}>{funFact.title}</Text>
                ) : null}
                <Text style={styles.description}>{funFact.description}</Text>
                <View style={styles.sourceContainer}>
                  <Text style={styles.sourceLabel}>Source: </Text>
                  <Text
                    style={styles.sourceLink}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    onPress={() => Linking.openURL(funFact.source)}>
                    {funFact.source}
                  </Text>
                </View>
                <Text style={styles.submittedBy}>
                  Submitted By: {funFact.submittedBy}
                </Text>
                <View style={styles.tagsContainer}>
                  {funFact.tags.map((tag, index) => (
                    <TouchableOpacity key={index} style={styles.tagButton}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.likes}>{funFact.likes} likes</Text>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleLike}>
                    <FontAwesomeIcon
                      icon={liked ? faThumbsUpSolid : faThumbsUp}
                      size={25}
                      color="green"
                    />
                    <Text style={styles.actionLabel}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <FontAwesomeIcon icon={faShareAll} size={25} color="blue" />
                    <Text style={styles.actionLabel}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDispute(funFact.id)}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      size={25}
                      color="brown"
                    />
                    <Text style={styles.actionLabel}>Dispute</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleReport(funFact.id)}>
                    <FontAwesomeIcon icon={faFlag} size={25} color="red" />
                    <Text style={styles.actionLabel}>Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        ))}
      </Swiper>
      <View style={styles.pageNumberContainer}>
        <Text style={styles.pageNumberText}>
          {currentIndex + 1} / {details.length}
        </Text>
      </View>
    </View>
  );
};

export default LandmarkDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeContainer: {
    flex: 1,
    width: screenWidth,
  },
  contentContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageCaption: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  sourceLabel: {
    fontSize: 13,
    color: 'gray',
  },
  sourceLink: {
    fontSize: 13,
    color: 'blue',
    textDecorationLine: 'underline',
    flexShrink: 1,
  },
  submittedBy: {
    fontSize: 13,
    color: 'gray',
    marginVertical: 0,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tagButton: {
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
  },
  tagText: {
    color: 'blue',
  },
  likes: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  pageNumberContainer: {
    position: 'absolute',
    bottom: 20,
    left: screenWidth / 2 - 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pageNumberText: {
    color: 'white',
    fontSize: 12,
  },
});
