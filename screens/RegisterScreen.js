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


const RegisterScreen = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const serverIP = process.env.DB_HOST;

  const handleRegister = () => {
    axios
      .post(`http://${serverIP}:8080/auth/register`, { name, email, password })
      .then((response) => {
        console.log(response.data);
        handleLogin({ privilege: response.data.privilege }); // Establecer el privilegio del usuario
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error(error.response.data.error);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Registro</Text>
      <Text style={styles.subtitleText}>Crea una cuenta nueva</Text>

      <View style={styles.inputView}>
        <Text style={styles.labelText}>Nombre</Text>
        <TextInput
          style={styles.inputText}
          placeholder=""
          placeholderTextColor="#D3D3D3"
          onChangeText={setName}
          value={name}
        />
      </View>
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
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
  registerButton: {
    backgroundColor: "#145498",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    alignSelf: "stretch",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#37414d",
    marginRight: 5,
    fontSize: 15,
  },
  loginButton: {
    alignSelf: "flex-start",
  },
  loginButtonText: {
    color: "#145498",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default RegisterScreen;
