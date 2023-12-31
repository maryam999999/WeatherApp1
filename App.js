import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import Airpollution from './components/Airpollution';
import Weathermap from './components/Weathermap';
import Settings from './components/Settings';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';

const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";

const Stack = createStackNavigator();

const Splash = () => (
  <View style={styles.container}>
    <Image source={require('./assets/splash.png')} style={styles.splashImage} />
  </View>
);

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.log(error);
      setWeatherData(null);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      await fetchWeatherData('Pakistan');

      // Simulate a delay (you can replace this with actual initialization code)
      await new Promise(resolve => setTimeout(resolve, 10000));

      setLoaded(true);
      setShowSplash(false);
    };

    initializeApp();
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerTitle: 'Forgot Password' }}
        />
        <Stack.Screen
          name="Weather"
          options={{ headerShown: false }}
        >
          {(props) => (
            <Weather
              {...props}
              weatherData={weatherData}
              fetchWeatherData={fetchWeatherData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SearchBar">
          {(props) => (
            <SearchBar
              {...props}
              fetchWeatherData={fetchWeatherData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Forecast">
          {(props) => (
            <Forecast
              {...props}
              // You may need to pass other necessary props
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Airpollution">
          {(props) => (
            <Airpollution
              {...props}
              // You may need to pass other necessary props
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Weathermap">
          {(props) => (
            <Weathermap
              {...props}
              // You may need to pass other necessary props
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => (
            <Settings
              {...props}
              // You may need to pass other necessary props
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default App;
