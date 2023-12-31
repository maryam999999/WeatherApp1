import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Appearance } from 'react-native';

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function Settings({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const handleLogout = () => {
    // Navigate to the Login screen
    navigation.navigate('Login');
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Add your theme change logic here
  };

  const handleNotificationSettings = () => {
    // Add functionality for notification settings button
  };

  const handleLocationSettings = () => {
    // Add functionality for location settings button
  };

  const handleAccountPrivacy = () => {
    // Add functionality for account privacy button
  };

  const handleFavourites = () => {
    // Add functionality for favourites button
  };

  const handleFollowAndInviteFriends = () => {
    // Add functionality for follow and invite friends button
  };

  const handleLanguageSettings = () => {
    // Add functionality for language settings button
  };

  const handleDataUsage = () => {
    // Add functionality for data usage button
  };

  const handleSharing = () => {
    // Add functionality for sharing button
  };

  const handleTimeSpent = () => {
    // Add functionality for time spent button
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.headerText, isDarkMode && styles.darkModeText]}>Settings</Text>

      {/* Theme Toggle */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, isDarkMode && styles.darkModeText]}>Dark Mode:</Text>
        <Switch
          value={isDarkMode}
          onValueChange={handleThemeToggle}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      {/* Buttons */}
      <CustomButton title="Notification Settings" onPress={handleNotificationSettings} />
      <CustomButton title="Location Settings" onPress={handleLocationSettings} />
      <CustomButton title="Account Privacy" onPress={handleAccountPrivacy} />
      <CustomButton title="Favourites" onPress={handleFavourites} />
      <CustomButton title="Follow and Invite Friends" onPress={handleFollowAndInviteFriends} />
      <CustomButton title="Language Settings" onPress={handleLanguageSettings} />
      <CustomButton title="Data Usage" onPress={handleDataUsage} />
      <CustomButton title="Sharing" onPress={handleSharing} />
      <CustomButton title="Time Spent" onPress={handleTimeSpent} />

      {/* Log Out Button */}
      <CustomButton title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkModeContainer: {
    backgroundColor: '#333', // Dark mode background color
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333', // Header text color
  },
  darkModeText: {
    color: '#fff', // Dark mode text color
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: '#333', // Setting label text color
  },
  button: {
    backgroundColor: '#007AFF', // Button background color
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%', // Make button take full width
  },
  buttonText: {
    color: '#fff', // Button text color
    textAlign: 'center',
    fontSize: 16,
  },
});
