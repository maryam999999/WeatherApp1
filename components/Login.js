import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Weather");
      }
    });

    return unsubscribe;
  }, [navigation]);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
  };

  const forgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator size="large" color="#FF69B4" />
        </View>
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign In</Text>
            <Text style={styles.subHeaderText}>Sign In to your account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <Pressable
              onPress={login}
              style={[styles.loginButton, { backgroundColor: "#FFD1DC" }]}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Signup")} style={styles.signupLink}>
              <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </Pressable>

            <Pressable onPress={forgetPassword} style={styles.forgetPasswordLink}>
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C3A3E5",
    padding: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  loadingText: {
    marginRight: 10,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  headerText: {
    fontSize: 20,
    color: "#662d91",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
  form: {
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    marginVertical: 10,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#FFD1DC", // Baby Pink color
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
  forgetPasswordLink: {
    marginTop: 10,
    alignSelf: "center",
  },
  forgetPasswordText: {
    fontSize: 16,
    color: "#662d91",
    textDecorationLine: "underline",
  },
});

export default Login;