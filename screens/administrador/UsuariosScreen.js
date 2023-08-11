import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AdminUsItem from "../../components/AdminUsItem";
import { DB_HOST } from "@env";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const UsuariosScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.14:8080/admin/adminus`);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Configura el intervalo para realizar el polling cada 5 segundos
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000); // Cambia el intervalo según tus necesidades

    return () => {
      clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    };
  }, []);

  const renderUsuarios = ({ item }) => {
    return <AdminUsItem {...item} />;
  };

  const handleFilterChange = (text) => {
    setFiltro(text);
    filterUsuarios(text);
  };

  const handleFilterPress = () => {
    let nextOrderBy = null;
    let toastText = "";

    switch (orderBy) {
      case null:
        nextOrderBy = "clave_usuario";
        toastText = "Ordenando por clave de usuario...";
        break;
      case "clave_usuario":
        nextOrderBy = "nombre";
        toastText = "Ordenando por nombre...";
        break;
      default:
        break;
    }

    setOrderBy(nextOrderBy);

    // Realiza el ordenamiento solo si se ha seleccionado un tipo de orden válido
    if (nextOrderBy) {
      const sortedData = [...usuarios].sort((a, b) => {
        switch (nextOrderBy) {
          case "clave_usuario":
            return a.clave_usuario - b.clave_usuario;
          case "nombre":
            return a.nombre - b.nombre;
          default:
            return 0;
        }
      });

      setUsuarios(sortedData);
    }

    Toast.show({
      type: "info",
      text1: "Filtrar",
      text2: toastText,
      position: "bottom",
      bottomOffset: 60,
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  const filterUsuarios = (text) => {
    if (text === "") {
      fetchData();
    } else {
      const filteredItems = usuarios.filter((item) => {
        const searchTerm = text.toLowerCase();

        return (
          item.clave_usuario.toString().includes(searchTerm) ||
          item.nombre.toString().includes(searchTerm) 
        );
      });

      setUsuarios(filteredItems);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#777" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          onChangeText={handleFilterChange}
          value={filtro}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Ionicons name="filter" size={24} color="#eef" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.clave_usuario}
        renderItem={({item}) => (
          <AdminUsItem {...item} fetchData={fetchData} />
        )}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    flex: 1,
    height: 40,
    backgroundColor: "#fffd",
    borderRadius: 4,
    paddingHorizontal: 15,
    position: "relative",
    elevation: 10,
    marginRight: 5,
  },
  filterButton: {
    backgroundColor: "#145498",
    borderRadius: 30,
    padding: 10,
  },
});

export default UsuariosScreen;
