import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateToNextScreen = async () => {
      // Simulate some asynchronous task, e.g., fetching data or checking authentication
      await new Promise(resolve => setTimeout(resolve, 30000)); // Adjust the duration to 30000 milliseconds (30 seconds)

      // Navigate to the next screen (replace 'Login' with the actual screen name)
      navigation.replace('Login');
    };

    navigateToNextScreen();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/splash.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
