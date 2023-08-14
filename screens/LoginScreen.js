import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DB_HOST } from "@env";
import { useDispatch } from 'react-redux'; // Importar useDispatch de react-redux
import { setIdUsuario } from './reducers/userReducer';
import * as Font from "expo-font";

const LoginScreen = ({ onLogin }) => {
  const dispatch = useDispatch(); // Obtener la función dispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigation = useNavigation();
  const serverIP = DB_HOST;

  // Importar fuentes
  const loadFonts = async () => {
    await Promise.all([
      Font.loadAsync({
        "jakarta-bold": require("../assets/fonts/Bold.ttf"),
        "jakarta-medium": require("../assets/fonts/Medium.ttf"),
        "jakarta-regular": require("../assets/fonts/Regular.ttf"),
        "jakarta-light": require("../assets/fonts/Light.ttf"),
        "jakarta-semi-bold": require("../assets/fonts/SemiBold.ttf"),
      }),
    ]);
  };

  useEffect(() => {
    loadFonts();
  }, []);const handleLogin = () => {
    axios
      .post(`http://192.168.1.10:8080/auth/login`, { email, password })
      .then((response) => {
        const { privilege, idUsuario } = response.data;
        if (privilege && idUsuario) {
          console.log(`Privilegio: ${privilege}`);
          console.log(`idUsuario: ${idUsuario}`);
          dispatch(setIdUsuario(idUsuario)); // Enviar el idUsuario a Redux
          onLogin({ privilege, idUsuario });
        } else {
          console.error("Respuesta del servidor inválida");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      });
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Text style={styles.subtitleText}>Inicie sesión para continuar</Text>
      {/* Input fields */}
      <View style={styles.inputView}>
        <View style={styles.labelContainer}>
          <Ionicons name="person-outline" size={24} color="#37414d" />
          <Text style={styles.labelText}>Usuario</Text>
        </View>
        <TextInput
          style={styles.emailInputText}
          placeholder=""
          placeholderTextColor="#D3D3D3"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.labelContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#37414d" />
          <Text style={styles.labelText}>Contraseña</Text>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInputText}
            secureTextEntry={!showPassword}
            placeholder=""
            placeholderTextColor="#D3D3D3"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={toggleShowPassword}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#37414d"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* End input fields */}
    
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  welcomeText: {
    // fontFamily: "jakarta-bold",
    fontSize: 30,
    color: "#081d33",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleText: {
    // fontFamily: "jakarta-regular",
    fontSize: 15,
    color: "#37414d",
    marginBottom: 60,
    textAlign: "center",
  },
  inputView: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  labelText: {
    // fontFamily: "jakarta-light",
    color: "#37414d",
    fontSize: 16,
    marginLeft: 5,
  },
  emailInputText: {
    fontFamily: "jakarta-semi-bold",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    height: 50,
    color: "#37414d",
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  passwordInputText: {
    flex: 0.9,
    fontFamily: "jakarta-semi-bold",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    height: 50,
    color: "#37414d",
    fontSize: 16,
  },
  showPasswordButton: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontFamily: "jakarta-semi-bold",
    color: "#145498",
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#145498",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    alignSelf: "stretch",
  },
  loginButtonText: {
    fontFamily: "jakarta-semi-bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    fontFamily: "jakarta-semi-bold",
    color: "#145498",
    fontSize: 15,
  },
});

export default LoginScreen;
