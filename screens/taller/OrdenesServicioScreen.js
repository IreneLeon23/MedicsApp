import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import OrdenItem from "../../components/OrdenItem";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

const OrdenesServicioScreen = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);
  // const serverIP = DB_HOST;

  const loadFonts = async () => {
    await Promise.all([
      Font.loadAsync({
        "jakarta-bold": require("../../assets/fonts/Bold.ttf"),
      }),
      Font.loadAsync({
        "jakarta-medium": require("../../assets/fonts/Medium.ttf"),
      }),
      Font.loadAsync({
        "jakarta-regular": require("../../assets/fonts/Regular.ttf"),
      }),
      Font.loadAsync({
        "jakarta-light": require("../../assets/fonts/Light.ttf"),
      }),
      Font.loadAsync({
        "jakarta-semi-bold": require("../../assets/fonts/SemiBold.ttf"),
      }),
    ]);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.0.18:8080/workshop/ordenes`) 
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ordenes de servicio:", error);
      });
  };

  const renderOrdenItem = ({ item }) => {
    const fechaFormateada = new Date(item.fecha_captura).toLocaleDateString(
      "es-ES"
    );
    return (
      <OrdenItem
        id={item.folio}
        nombre_producto={item.nombre_producto}
        fecha_captura={fechaFormateada}
        descripcion={item.descripcion}
        nombre_cliente={item.nombre_cliente}
      />
    );
  }; 

  const handleFilterChange = (text) => {
    setFiltro(text);
    filterOrdenes(text);
  };
  const handleFilterPress = () => {
    let nextOrderBy = null;
    let toastText = "";

    switch (orderBy) {
      case null:
        nextOrderBy = "nombre_producto";
        toastText = "Ordenando por nombre de producto...";
        break;
      case "nombre_producto":
        nextOrderBy = "fecha_captura";
        toastText = "Ordenando por fecha de captura...";
        break;
      case "fecha_captura":
        nextOrderBy = "nombre_cliente";
        toastText = "Ordenando por nombre de cliente...";
        break;
      case "nombre_cliente":
        nextOrderBy = null;
        toastText = "Ordenamiento desactivado";
        break;
      default:
        break;
    }

    setOrderBy(nextOrderBy);

    // Realiza el ordenamiento solo si se ha seleccionado un tipo de orden válido
    if (nextOrderBy) {
      const sortedData = [...ordenes].sort((a, b) => {
        switch (nextOrderBy) {
          case "nombre_producto":
            return a.nombre_producto.localeCompare(b.nombre_producto);
          case "fecha_captura":
            return new Date(a.fecha_captura) - new Date(b.fecha_captura);
          case "nombre_cliente":
            return a.nombre_cliente.localeCompare(b.nombre_cliente);
          default:
            return 0;
        }
      });

      setOrdenes(sortedData);
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

  const filterOrdenes = (text) => {
    if (text === "") {
      fetchData();
    } else {
      const filteredItems = ordenes.filter((item) => {
        const productName = item.nombre_producto.toLowerCase();
        const clientName = item.nombre_cliente.toLowerCase();
        const searchTerm = text.toLowerCase();

        return (
          productName.includes(searchTerm) || clientName.includes(searchTerm)
        );
      });

      setOrdenes(filteredItems);
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
          onPress={() => handleFilterPress("nombre_producto")}
        >
          <Ionicons name="filter" size={24} color="#eef" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={ordenes}
        keyExtractor={(item) => item.folio.toString()}
        renderItem={renderOrdenItem}
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

export default OrdenesServicioScreen;
