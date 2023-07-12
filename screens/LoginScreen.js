import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {DB_HOST} from "@env"

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const serverIP = DB_HOST;

  const handleLogin = () => {
    axios
      .post(`http://${serverIP}:8080/auth/login`, { email, password })
      .then((response) => {
        console.log(response.data);
        onLogin(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      });
  };
  const handleRegister = () => {
    navigation.navigate("Registro"); //navegar al registro 
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Text style={styles.subtitleText}>Inicie sesión para continuar</Text>
      {/* Input fields */}

      <View style={styles.inputView}>
        <Text style={styles.labelText}>Correo electrónico</Text>
        <TextInput
          style={styles.inputText}
          placeholder=""
          placeholderTextColor="#D3D3D3"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.labelText}>Contraseña</Text>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder=""
          placeholderTextColor="#D3D3D3"
          onChangeText={setPassword}
          value={password}
        />
      </View>

      {/* End input fields */}
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes cuenta?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 50,
  },

  welcomeText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#081d33",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 18,
    color: "#37414d",
    marginBottom: 40,
    textAlign: "center",
  },
  inputView: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  labelText: {
    color: "#37414d",
    marginBottom: 5,
    fontSize: 16,
  },
  inputText: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    height: 50,
    color: "#37414d",
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#145498",
    fontWeight: "bold",
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
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "#37414d",
    marginRight: 5,
    fontSize: 15,
  },
  signupButton: {
    alignSelf: "flex-start",
  },
  signupButtonText: {
    color: "#145498",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default LoginScreen;
