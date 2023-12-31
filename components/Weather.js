import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData, navigation }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!weatherData) {
          const data = await fetchWeatherData();
          setBackgroundImage(getBackgroundImg(data?.weather?.[0]?.main));
          setError(null);
        } else {
          setBackgroundImage(getBackgroundImg(weatherData?.weather?.[0]?.main));
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setBackgroundImage(haze);
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchWeatherData, weatherData]);

  const handleForecastPress = () => {
    navigation.navigate('Forecast', { city: weatherData?.name });
  };

  const handleAirPollutionPress = () => {
    navigation.navigate('Airpollution', { city: weatherData?.name });
  };

  const handleWeathermapPress = () => {
    navigation.navigate('Weathermap', { city: weatherData?.name });
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings'); // Navigate to the 'Settings' screen
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground source={backgroundImage} style={styles.backgroundImg} resizeMode="cover">
        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...styles.headerText, color: getTextColor() }}>{weatherData?.name}</Text>
          <Text style={{ ...styles.headerText, color: getTextColor(), fontWeight: 'bold' }}>
            {weatherData?.weather?.[0]?.main}
          </Text>
          <Text style={{ ...styles.headerText, color: getTextColor() }}>{weatherData?.main?.temp} °C</Text>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{weatherData?.main?.humidity} %</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{weatherData?.wind?.speed} m/s</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleWeathermapPress} style={styles.weathermapButton}>
          <Text style={{ color: 'white' }}>View Weather Map</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForecastPress} style={styles.forecastButton}>
          <Text style={{ color: 'white' }}>View Forecast</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAirPollutionPress} style={styles.airPollutionButton}>
          <Text style={{ color: 'white' }}>View Air Pollution</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
          <Text style={{ color: 'white' }}>Settings</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  function getBackgroundImg(weather) {
    if (weather === 'Snow') return snow;
    if (weather === 'Clear') return sunny;
    if (weather === 'Rain') return rainy;
    if (weather === 'Haze') return haze;
    return haze;
  }

  function getTextColor() {
    return backgroundImage !== sunny ? 'white' : 'black';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  weathermapButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20, // Adjusted margin
  },
  forecastButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  airPollutionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  settingsButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});