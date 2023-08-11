import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import NuevoItem from "../../components/NuevoItem";
import axios from "axios";
import DropDown from "react-native-paper-dropdown";
import { Provider } from "react-native-paper";

const NuevoUsuario = () => {
  const [ultimoClaveUsuario, setUltimoClaveUsuario] = useState(0);
  const [claveUsuario, setClaveUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [selectedPrivilegio, setSelectedPrivilegio] = useState("taller");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [estatus, setEstatus] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    axios
      .get("http://192.168.1.14:8080/admin/ultimoClaveUsuario")
      .then((response) => {
        const ultimoClave = parseInt(response.data.ultimoClaveUsuario, 10);
        const newClaveUsuario = ultimoClave + 1;
        setUltimoClaveUsuario(newClaveUsuario);
        setClaveUsuario(newClaveUsuario.toString());
      })
      .catch((error) => {
        console.error("Error al obtener el último valor de clave_usuario:", error);
      });
  }, []);

  const handleAddUsuarios = async () => {
    const nuevoUsuario = {
      clave_usuario: parseInt(claveUsuario, 10),
      nombre: nombre,
      privilegio: selectedPrivilegio,
      correo: correo,
      password: password,
      estatus: estatus,
      descripcion: descripcion 
    };

    try {
      const response = await axios.post(
        "http://192.168.1.14:8080/admin/newUser",
        nuevoUsuario,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      if (response.status === 200) {
        setClaveUsuario("");
        setNombre("");
        setSelectedPrivilegio("taller");
        setCorreo("");
        setPassword("");
        setEstatus("");
        setDescripcion("");
    
        setUsuarios([...usuarios, nuevoUsuario]); // Movido aquí
      } else {
        console.error("Error al agregar al usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Agregar nuevo usuario</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Clave Usuario"
            value={claveUsuario}
            onChangeText={(text) => setClaveUsuario(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={(text) => setNombre(text)}
          />
          {/* Dropdown para el campo privilegio */}
          <DropDown
            label={"Privilegio"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={selectedPrivilegio}
            setValue={setSelectedPrivilegio}
            list={[
              { label: "Taller", value: "taller" },
              { label: "Administrador", value: "administrador" },
            ]}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={(text) => setCorreo(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Estatus"
            value={estatus}
            onChangeText={(text) => setEstatus(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripcion"
            value={descripcion}
            onChangeText={(text) => setDescripcion(text)}
          />
          <TouchableOpacity style={styles.Button} onPress={handleAddUsuarios}>
            <Text style={styles.ButtonText}>Agregar Usuario</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          {usuarios.map((usuario, index) => (
            <NuevoItem key={index} usuario={usuario} />
          ))}
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  cardContainer: {
    marginTop: 20,
  },
  Button: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#145498",
    borderRadius: 5,
  },
  ButtonText: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    color: "#fff",
  },
});

export default NuevoUsuario;
