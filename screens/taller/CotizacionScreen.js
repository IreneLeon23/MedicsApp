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
import CotizacionItem from "../../components/CotizacionesItem";
import { DB_HOST } from "@env";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const CotizacionScreen = () => {
  const [cotizacion, setCotizacion] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.10:8080/workshop/cotizacion`)
      .then((response) => {
        setCotizacion(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las cotizaciones:", error);
      });
  };

  const renderCotizacion = ({ item }) => {
    return <CotizacionItem {...item} />;
  };

  const handleFilterChange = (text) => {
    setFiltro(text);
    filterCotizacion(text);
  };

  const handleFilterPress = () => {
    let nextOrderBy = null;
    let toastText = "";

    switch (orderBy) {
      case null:
        nextOrderBy = "folio";
        toastText = "Ordenando por folio de trabajo...";
        break;
      case "folio":
        nextOrderBy = "equipo";
        toastText = "Ordenando por equipo...";
        break;
        case "equipo":
      default:
        break;
    }

    setOrderBy(nextOrderBy);

    // Realiza el ordenamiento solo si se ha seleccionado un tipo de orden válido
    if (nextOrderBy) {
      const sortedData = [...cotizacion].sort((a, b) => {
        switch (nextOrderBy) {
          case "folio":
            return a.folio - b.folio;
          case "equipo":
            return a.equipo - b.equipo;
          default:
            return 0;
        }
      });

      setCotizacion(sortedData);
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

  const filterCotizacion = (text) => {
    if (text === "") {
      fetchData();
    } else {
      const filteredItems = cotizacion.filter((item) => {
        const searchTerm = text.toLowerCase();

        return (
          item.folio.toString().includes(searchTerm) ||
          item.equipo.includes(searchTerm) 
        );
      });

      setCotizacion(filteredItems);
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
        data={cotizacion}
        keyExtractor={(item) => item.folio}
        renderItem={renderCotizacion}
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

export default CotizacionScreen;
