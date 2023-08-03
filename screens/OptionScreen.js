import { React, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const OptionsScreen = ({ navigation }) => {
  const loadFonts = async () => {
    await Promise.all([
      Font.loadAsync({
        "jakarta-semi-bold": require("../assets/fonts/SemiBold.ttf"),
      }),
    ]);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handleRegularLogin = () => {
    navigation.navigate("Login");
  };
  const handleRegister = () => {
    navigation.navigate("Registro"); // Reemplaza "Registro" con el nombre de la pantalla de registro en tu archivo de navegación
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
            style={styles.mainButton}
            onPress={handleRegularLogin}
          >
            <Text style={styles.mainText}>Iniciar sesión</Text>
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
    fontFamily: "jakarta-semi-bold",
    color: "#131517",
    fontSize: 16,
    textAlign: "center",
  },
  alterText: {
    fontFamily: "jakarta-semi-bold",
    color: "#E7E7E7",
    fontSize: 16,
    textAlign: "center",
  },
  textContainer: {
    fontFamily: "jakarta-semi-bold",
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 20,
  },
  refText: {
    fontFamily: "jakarta-semi-bold",
    textDecorationLine: "underline",
    color: "#E7E7E7",
    fontSize: 14,
  },
  refButton: {},
});

export default OptionsScreen;
