import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, {useEffect} from 'react';
import {Amplify, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faSearch,
  faBell,
  faBars,
} from '@fortawesome/pro-light-svg-icons';
import {
  faCirclePlus,
  faHouse as faHouseSolid,
  faSearch as faSearchSolid,
  faBell as faBellSolid,
  faBars as faBarsSolid,
} from '@fortawesome/pro-solid-svg-icons';
import MainScreen from './screens/MainScreen';
import AddFunFactScreen from './screens/AddFunFactScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import LandmarkDetailScreen from './screens/LandmarkDetailScreen';
import ReportScreen from './screens/ReportScreen';
import DisputeScreen from './screens/DisputeScreen';
import {withAuthenticator} from '@aws-amplify/ui-react-native';

Amplify.configure(awsconfig);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          let iconName = '';
          let iconComponent = (
            <Icon name={iconName} size={size} color={color} />
          );

          if (route.name === 'Home') {
            iconName = focused ? faHouseSolid : faHouse;
            iconComponent = (
              <FontAwesomeIcon icon={iconName} size={20} color={color} />
            );
          } else if (route.name === 'Search') {
            iconName = focused ? faSearchSolid : faSearch;
            iconComponent = (
              <FontAwesomeIcon icon={iconName} size={20} color={color} />
            );
          } else if (route.name === 'Notifications') {
            iconName = focused ? faBellSolid : faBell;
            iconComponent = (
              <FontAwesomeIcon icon={iconName} size={20} color={color} />
            );
          } else if (route.name === 'Menu') {
            iconName = focused ? faBarsSolid : faBars;
            iconComponent = (
              <FontAwesomeIcon icon={iconName} size={20} color={color} />
            );
          }

          return iconComponent;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="AddFunFact"
        component={AddFunFactScreen}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              style={styles.addButton}
              onPress={() => navigation.navigate('AddFunFact')}>
              <FontAwesomeIcon icon={faCirclePlus} size={40} color="green" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Notifications" component={MainScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}

const MenuScreen = ({navigation}) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuRow}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Leaderboard')}>
          <Icon name="leaderboard" size={50} color="black" />
          <Text style={styles.menuButtonText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={50} color="black" />
          <Text style={styles.menuButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuRow}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('About')}>
          <Icon name="info" size={50} color="black" />
          <Text style={styles.menuButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Help')}>
          <Icon name="help" size={50} color="black" />
          <Text style={styles.menuButtonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AboutScreen = () => (
  <View style={styles.screenContainer}>
    <Text>About Screen</Text>
  </View>
);

const HelpScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Help Screen</Text>
  </View>
);

function App() {
  const navigation = useNavigation();

  useEffect(() => {
    const listener = data => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in');
          navigation.navigate('Main');
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');
          break;
      }
    };

    Hub.listen('auth', listener);

    return () => {
      Hub.remove('auth', listener);
    };
  }, [navigation]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image
                  source={{uri: 'https://your-user-profile-image-url'}}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="AddFunFact" component={AddFunFactScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="LandmarkDetail" component={LandmarkDetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Dispute" component={DisputeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  addButton: {
    position: 'relative',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 35,
    width: 60,
    height: 60,
    zIndex: 1,
    elevation: 5,
  },
  tabBarMiddleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  menuButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '40%',
  },
  menuButtonText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 10,
  },
});
