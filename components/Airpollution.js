import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const API_KEY = "19e118dde8051ac8a757725d141605ad";

export default function AirPollution({ route }) {
  const { city } = route.params;
  const [airPollutionData, setAirPollutionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAirPollutionData(city) {
      const weatherApiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

      try {
        const response = await fetch(weatherApiEndpoint);
        if (response.ok) {
          const weatherData = await response.json();
          const { lat, lon } = weatherData.coord;

          const airPollutionApiEndpoint = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

          const airPollutionResponse = await fetch(airPollutionApiEndpoint);
          if (airPollutionResponse.ok) {
            const airPollutionData = await airPollutionResponse.json();
            setAirPollutionData(airPollutionData);
            setError(null);
          } else {
            setError('Error fetching air pollution data');
          }
        } else {
          setError('Error fetching weather data');
        }
      } catch (error) {
        console.error('Error fetching air pollution data:', error);
        setError('Error fetching air pollution data');
      } finally {
        setLoading(false);
      }
    }

    fetchAirPollutionData(city);
  }, [city]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="white" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {airPollutionData && (
        <View>
          <Text style={styles.headerText}>Air Pollution Information for {city} :</Text>
          <Text style={styles.infoText}>Air Quality Index (AQI): {airPollutionData.list[0]?.main?.aqi}</Text>
          {/* Add more information as needed */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'grey',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
    color: 'grey',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
});
