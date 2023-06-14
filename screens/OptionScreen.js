// OptionsScreen.js

import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OptionsScreen = ({ navigation }) => {
  const handleRegularLogin = () => {
    navigation.navigate("Login");
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/optionScreenBg.png")}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        blurRadius={1}
      >
        <View style={styles.overlay} />
        <Image
          source={require("../assets/MedicsLogoConLetra.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.alterButton}
            onPress={handleGoogleLogin}
          >
            <Text style={styles.alterText}>
              {" "}
              <Ionicons name="logo-google" size={24} color="#fff" /> Entrar con
              Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleRegularLogin}
          >
            <Text style={styles.mainText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>No tienes una cuenta?</Text>
          <TouchableOpacity style={styles.refButton}>
            <Text style={styles.refText}> Registrate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(50, 140, 188, 0.72)",
  },
  logo: {
    width: 340,
    height: 240,
    marginBottom: 40,
    marginTop: 40,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
    marginTop: 30,
  },
  alterButton: {
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E7E7E7",
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: "#E7E7E7",
    paddingVertical: 15,
    borderRadius: 10,
  },
  mainText: {
    color: "#131517",
    fontSize: 16,
    textAlign: "center",
  },
  alterText: {
    color: "#E7E7E7",
    fontSize: 16,
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 20,
  },
  text: {
    color: "#E7E7E7",
    fontSize: 14,
    marginTop: 20,
  },
  refText: {
    color: "#E7E7E7",
    fontSize: 14,
    fontWeight: "bold",
  },
  refButton: {},
});

export default OptionsScreen;
