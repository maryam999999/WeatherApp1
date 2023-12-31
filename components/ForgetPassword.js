import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the correct function

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    sendPasswordResetEmail(auth, email) // Use the correct function
      .then(() => {
        Alert.alert('Success', 'Password reset email sent successfully!');
      })
      .catch((error) => {
        Alert.alert('Error', `Error sending password reset email: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your email address to reset your password.</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable onPress={handleResetPassword} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3A3E5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#662d91',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 20,
    color: 'black',
  },
  resetButton: {
    backgroundColor: '#FFD1DC', // Baby Pink color
    padding: 15,
    borderRadius: 7,
    alignSelf: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});

export default ForgetPassword;
