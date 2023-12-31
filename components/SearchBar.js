import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchBar({ fetchWeatherData }) {
  const [cityName, setCityName] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    console.log('Searching for:', cityName);

    if (cityName.trim() !== '') {
      try {
        await fetchWeatherData(cityName);
        console.log('Fetching weather data...');

        // Directly navigate to the Weather screen
        navigation.navigate('Weather');
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    } else {
      console.log('City name is empty!');
    }
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder='Enter City name'
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <TouchableOpacity onPress={handleSearch}>
        <EvilIcons name="search" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
  },
});
