import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable } from "react-native";
import OrdenItem from "../../components/OrdenItem";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

const OrdenesServicioScreen = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("nombre_producto");
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const serverIP = "http://192.168.1.21:8080"; // Replace with your server IP

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
      .get(`${serverIP}/taller/ordenes/getOrden`)
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ordenes de servicio:", error);
      });
  };

  const renderOrdenItem = ({ item }) => {
    const fechaCapturaFormateada = new Date(item.fecha_captura).toLocaleDateString("es-ES");
    const fechaCompromisoFormateada = new Date(item.fecha_compromiso).toLocaleDateString("es-ES");
    return (
      <OrdenItem
        folio={item.folio}
        nombre_producto={item.nombre_producto}
        fecha_captura={fechaCapturaFormateada}
        fecha_compromiso={fechaCompromisoFormateada}
        descripcion_producto={item.descripcion_producto}
        nombre_cliente={item.nombre_cliente}
        telefono_cliente={item.telefono_cliente}
        whats_cliente={item.whats_cliente}
        estado={item.estado}
        paso={item.paso_actual}
      />
    );
  };

  const handleFilterChange = (text) => {
    setFiltro(text);
    filterOrdenes(text);
  };

  const handleFilterPress = () => {
    setIsModalVisible(true);
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setIsModalVisible(false);
    applySorting(field, selectedOrder);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(false);
    applySorting(selectedField, order);
  };

  const applySorting = (field, order) => {
    const sortedData = [...ordenes].sort((a, b) => {
      let result;
      if (field === "estado") {
        const estadoOrderAsc = ["Recibida", "Trabajo", "Finalizada", "Entregada"];
        const estadoOrderDesc = [...estadoOrderAsc].reverse();
        result =
          order === "asc"
            ? estadoOrderAsc.indexOf(a.estado) - estadoOrderAsc.indexOf(b.estado)
            : estadoOrderDesc.indexOf(a.estado) - estadoOrderDesc.indexOf(b.estado);
      } else {
        switch (field) {
          case "nombre_producto":
            result = a.nombre_producto.localeCompare(b.nombre_producto);
            break;
          case "folio":
            result = a.folio - b.folio;
            break;
          case "fecha_captura":
            result = new Date(a.fecha_captura) - new Date(b.fecha_captura);
            break;
          case "fecha_compromiso":
            result = new Date(a.fecha_compromiso) - new Date(b.fecha_compromiso);
            break;
          case "nombre_cliente":
            result = a.nombre_cliente.localeCompare(b.nombre_cliente);
            break;
          default:
            result = 0;
            break;
        }
      }

      return order === "asc" ? result : -result;
    });

    setOrdenes(sortedData);
  };

  const FilterModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ordenar por:</Text>
            <TouchableOpacity
              style={[styles.modalItem, selectedField === "nombre_producto" && styles.selectedItem]}
              onPress={() => handleFieldSelect("nombre_producto")}
            >
              <Text
                style={[styles.modalItemText, selectedField === "nombre_producto" && styles.selectedItemText]}
              >
                Nombre del Producto
              </Text>
              {selectedField === "nombre_producto" && (
                <Ionicons
                  name={selectedOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={18}
                  color="#145498"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, selectedField === "folio" && styles.selectedItem]}
              onPress={() => handleFieldSelect("folio")}
            >
              <Text
                style={[styles.modalItemText, selectedField === "folio" && styles.selectedItemText]}
              >
                Folio
              </Text>
              {selectedField === "folio" && (
                <Ionicons
                  name={selectedOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={18}
                  color="#145498"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, selectedField === "fecha_captura" && styles.selectedItem]}
              onPress={() => handleFieldSelect("fecha_captura")}
            >
              <Text
                style={[styles.modalItemText, selectedField === "fecha_captura" && styles.selectedItemText]}
              >
                Fecha de Captura
              </Text>
              {selectedField === "fecha_captura" && (
                <Ionicons
                  name={selectedOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={18}
                  color="#145498"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, selectedField === "fecha_compromiso" && styles.selectedItem]}
              onPress={() => handleFieldSelect("fecha_compromiso")}
            >
              <Text
                style={[styles.modalItemText, selectedField === "fecha_compromiso" && styles.selectedItemText]}
              >
                Fecha de Compromiso
              </Text>
              {selectedField === "fecha_compromiso" && (
                <Ionicons
                  name={selectedOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={18}
                  color="#145498"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, selectedField === "nombre_cliente" && styles.selectedItem]}
              onPress={() => handleFieldSelect("nombre_cliente")}
            >
              <Text
                style={[styles.modalItemText, selectedField === "nombre_cliente" && styles.selectedItemText]}
              >
                Nombre de Cliente
              </Text>
              {selectedField === "nombre_cliente" && (
                <Ionicons
                  name={selectedOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={18}
                  color="#145498"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, selectedField === "estado" && styles.selectedItem]}
              onPress={() => handleFieldSelect("estado")}
            >
              <Text
                style={[styles.modalItemText, selectedField === "estado" && styles.selectedItemText]}
              >
                Estado
              </Text>
              {selectedField === "estado" && (
                <Ionicons
                  name={selectedOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={18}
                  color="#145498"
                />
              )}
            </TouchableOpacity>
            <Text style={styles.modalSubtitle}>Orden:</Text>
            <TouchableOpacity
              style={[styles.modalItem, selectedOrder === "asc" && styles.selectedItem]}
              onPress={() => handleOrderSelect("asc")}
            >
              <Text
                style={[styles.modalItemText, selectedOrder === "asc" && styles.selectedItemText]}
              >
                A-Z / Menor a Mayor
              </Text>
              {selectedOrder === "asc" && (
                <Ionicons name="arrow-down" size={18} color="#145498" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, selectedOrder === "desc" && styles.selectedItem]}
              onPress={() => handleOrderSelect("desc")}
            >
              <Text
                style={[styles.modalItemText, selectedOrder === "desc" && styles.selectedItemText]}
              >
                Z-A / Mayor a Menor
              </Text>
              {selectedOrder === "desc" && (
                <Ionicons name="arrow-up" size={18} color="#145498" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
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
        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <Ionicons name="filter" size={24} color="#eef" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={ordenes}
        keyExtractor={(item) => item.folio.toString()}
        renderItem={renderOrdenItem}
      />
      <Toast />
      {isModalVisible && (
        <FilterModal />
      )}
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
  },  // Nuevos estilos para la Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "80%",
  },
  modalTitle: {
    fontFamily: "jakarta-bold",
    fontSize: 18,
    marginBottom: 8,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  modalItemText: {
    fontFamily: "jakarta-regular",
    fontSize: 16,
    marginLeft: 8,
  },
  selectedItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
  },
  selectedItemText: {
    color: "#145498",
  },

});

export default OrdenesServicioScreen;
