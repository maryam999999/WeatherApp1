import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

const API_KEY = '607bbc71072a8ad5463ed9c13b3334c6';

export default function Weathermap({ route }) {
  const { city } = route.params;

  // You need to obtain the latitude and longitude of the city using a geocoding service
  // For simplicity, let's assume static coordinates for now
  const cityCoordinates = { latitude: 37.7749, longitude: -122.4194 };

  // Construct the OpenWeatherMap tile layer URL
  const tileLayerUrl = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`Weather Map for ${city}`}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: cityCoordinates.latitude,
          longitude: cityCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate={tileLayerUrl}
          zIndex={-1}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}); 