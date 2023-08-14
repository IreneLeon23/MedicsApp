import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import ClientItem from "../../components/ClientItem";
import Toast from "react-native-toast-message";

const ClientScreen = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);
  const [shouldReloadData, setShouldReloadData] = useState(false);

  const fetchData = (reload = false) => {
    axios
      .get(`http://192.168.1.10:8080/admin/clients`)
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderClientes = ({ item }) => {
    if (!item) {
      return null; // Evitar renderizar si el objeto es undefined o nulo
    }
    return <ClientItem {...item} />;
  };

  const handleFilterChange = (text) => {
    setFiltro(text);
    filterClientes(text);
  };

  const handleFilterPress = () => {
    let nextOrderBy = null;
    let toastText = "";

    switch (orderBy) {
      case null:
        nextOrderBy = "clave_cliente";
        toastText = "Ordenando por clave de cliente...";
        break;
      case "clave_cliente":
        nextOrderBy = "nombre";
        toastText = "Ordenando por nombre...";
        break;
      default:
        break;
    }

    setOrderBy(nextOrderBy);

    // Realiza el ordenamiento solo si se ha seleccionado un tipo de orden válido
    if (nextOrderBy) {
      const sortedData = [...clientes].sort((a, b) => {
        switch (nextOrderBy) {
          case "clave_cliente":
            return a.clave_cliente - b.clave_cliente;
          case "nombre":
            return a.nombre - b.nombre;
          default:
            return 0;
        }
      });

      setClientes(sortedData);
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

  const filterClientes = (text) => {
    if (text === "") {
      fetchData();
    } else {
      const filteredItems = clientes.filter((item) => {
        const searchTerm = text.toLowerCase();

        return (
          item.clave_cliente.toString().includes(searchTerm) ||
          item.nombre.includes(searchTerm)
        );
      });

      setClientes(filteredItems);
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
        data={clientes}
        keyExtractor={(item) => item.clave_cliente}
        renderItem={renderClientes}
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

export default ClientScreen;
