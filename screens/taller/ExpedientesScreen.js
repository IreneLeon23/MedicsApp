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
import ExpedienteItem from "../../components/ExpedienteItem";
import { DB_HOST } from "@env";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ExpedientesScreen = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.15:8080/workshop/expedientes`)
      .then((response) => {
        setExpedientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los expedientes:", error);
      });
  };

  const renderExpedienteItem = ({ item }) => {
    return <ExpedienteItem {...item} />;
  };

  const handleFilterChange = (text) => {
    setFiltro(text);
    filterExpedientes(text);
  };

  const handleFilterPress = () => {
    let nextOrderBy = null;
    let toastText = "";

    switch (orderBy) {
      case null:
        nextOrderBy = "id_expediente";
        toastText = "Ordenando por ID Expediente...";
        break;
      case "id_expediente":
        nextOrderBy = "fecha_entrada";
        toastText = "Ordenando por fecha de entrada...";
        break;
      case "fecha_entrada":
        nextOrderBy = "fk_servicio";
        toastText = "Ordenando por ID Servicio...";
        break;
      case "fk_servicio":
        nextOrderBy = "fk_usuario";
        toastText = "Ordenando por ID Usuario...";
        break;
      case "fk_usuario":
        nextOrderBy = null;
        toastText = "Ordenamiento desactivado";
        break;
      default:
        break;
    }

    setOrderBy(nextOrderBy);

    // Realiza el ordenamiento solo si se ha seleccionado un tipo de orden válido
    if (nextOrderBy) {
      const sortedData = [...expedientes].sort((a, b) => {
        switch (nextOrderBy) {
          case "id_expediente":
            return a.id_expediente - b.id_expediente;
          case "fecha_entrada":
            return new Date(a.fecha_entrada) - new Date(b.fecha_entrada);
          case "fk_servicio":
            return a.fk_servicio - b.fk_servicio;
          case "fk_usuario":
            return a.fk_usuario - b.fk_usuario;
          default:
            return 0;
        }
      });

      setExpedientes(sortedData);
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

  const filterExpedientes = (text) => {
    if (text === "") {
      fetchData();
    } else {
      const filteredItems = expedientes.filter((item) => {
        const searchTerm = text.toLowerCase();

        return (
          item.id_expediente.toString().includes(searchTerm) ||
          item.fk_servicio.toString().includes(searchTerm) ||
          item.fk_usuario.toString().includes(searchTerm)
        );
      });

      setExpedientes(filteredItems);
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
        data={expedientes}
        keyExtractor={(item) => item.id_expediente.toString()}
        renderItem={renderExpedienteItem}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
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

export default ExpedientesScreen;
