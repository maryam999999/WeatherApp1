import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const API_KEY = "e5ce5169698885e54e3de594e339583a"; // Replace with your actual API key

export default function Forecast({ route }) {
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const city = route.params?.city;

    async function fetchWeeklyForecast(city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        if (response.status === 200) {
          const data = await response.json();
          setWeeklyForecast(data.list);
          setError(null);
        } else {
          setError('Error fetching weekly forecast data');
        }
      } catch (error) {
        console.error('Error fetching weekly forecast data:', error);
        setError('Error fetching weekly forecast data');
      } finally {
        setLoading(false);
      }
    }

    if (city) {
      fetchWeeklyForecast(city);
    }
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
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
      <Text style={styles.headerText}>Weekly Forecast for {route.params?.city}</Text>
      <FlatList
        data={weeklyForecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.dateText}>{getFormattedDate(item.dt_txt)}</Text>
            <Text style={styles.temperatureText}>
              Temperature: {(item.main.temp - 273.15).toFixed(2)} °C
            </Text>
            {/* Add other information you want to display */}
          </View>
        )}
      />
    </View>
  );
}

function getFormattedDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperatureText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
