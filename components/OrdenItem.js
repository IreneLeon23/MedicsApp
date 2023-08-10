import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import * as Font from "expo-font";
import OrdenModal from "./OrdenModal";
import TrabajosItem from "./TrabajosItem"

const OrdenItem = ({
  fk_orden_cotizacion,
  folio,
  nombre_producto,
  nombre_cliente,
  fecha_captura,
  fecha_compromiso,
  descripcion_producto,
  telefono_cliente,
  whats_cliente,
  estado,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trabajoInfo, setTrabajoInfo] = useState([]);
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    // Cargar información de trabajos al montar el componente
    axios
      .get(
        `http://192.168.1.14:8080/workshop/trabajos?fk_orden_cotizacion=${folio}`
      )
      .then((response) => {
        setTrabajoInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información del trabajo:", error);
      });

    // ... Resto del código ...
  }, [estado, folio]);

  useEffect(() => {
    // Set the appropriate icon name based on the estado
    switch (estado) {
      case "Recibida":
        setIconName("location-enter");
        break;
      case "Trabajo":
        setIconName("wrench");
        break;
      case "Finalizada":
        setIconName("check-circle");
        break;
      case "Entregada":
        setIconName("truck-delivery");
        break;
      default:
        setIconName("alert-circle"); // You can use any default icon here
        break;
    }
  }, [estado]);

  useEffect(() => {
    const loadFonts = async () => {
      await Promise.all([
        Font.loadAsync({
          "jakarta-bold": require("../assets/fonts/Bold.ttf"),
        }),
        Font.loadAsync({
          "jakarta-medium": require("../assets/fonts/Medium.ttf"),
        }),
        Font.loadAsync({
          "jakarta-regular": require("../assets/fonts/Regular.ttf"),
        }),
        Font.loadAsync({
          "jakarta-light": require("../assets/fonts/Light.ttf"),
        }),
        Font.loadAsync({
          "jakarta-semi-bold": require("../assets/fonts/SemiBold.ttf"),
        }),
      ]);
    };
    loadFonts();
  }, []);

  const handlePhoneCall = () => {
    const phoneUrl = `tel:${telefono_cliente}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          console.log("La función de llamada no es compatible.");
        }
      })
      .catch((error) => {
        console.error("Error al abrir la marcación al teléfono:", error);
      });
  };

  const handleWhatsAppMessage = () => {
    const whatsAppUrl = `whatsapp://send?phone=${whats_cliente}`;
    Linking.canOpenURL(whatsAppUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsAppUrl);
        } else {
          console.log("La función de WhatsApp no es compatible.");
        }
      })
      .catch((error) => {
        console.error("Error al abrir WhatsApp:", error);
      });
  };

  return (
    <View style={styles.fatherContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.fieldContainerAltStart}>
            {/* Conditionally applying style based on estado */}
            <View style={styles.estadoContainer}>
              <MaterialCommunityIcons
                name={iconName}
                size={16}
                color={
                  estado === "Recibida"
                    ? styles.ordenEstado.color
                    : estado === "Trabajo"
                    ? styles.trabajoEstado.color
                    : estado === "Finalizada"
                    ? styles.finalizadaEstado.color
                    : estado === "Entregada"
                    ? styles.entregadaEstado.color
                    : styles.defaultEstado.color
                }
                style={styles.estadoIcon}
              />
              <Text
                style={[
                  styles.fieldTerciary,
                  styles.opaqueText,
                  styles.estadoText,
                  estado === "Recibida"
                    ? styles.ordenEstado
                    : estado === "Trabajo"
                    ? styles.trabajoEstado
                    : estado === "Finalizada"
                    ? styles.finalizadaEstado
                    : estado === "Entregada"
                    ? styles.entregadaEstado
                    : styles.defaultEstado,
                ]}
              >
                {estado}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldPrimary}>{nombre_producto} </Text>
            <MaterialCommunityIcons name="tag" size={20} color="#145498" />
            <Text style={styles.fieldPrimaryID}>{folio}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldSecondary}>{fecha_captura}</Text>
            <MaterialCommunityIcons
              name="calendar-import"
              size={16}
              color="#777"
            />
            <Text style={styles.fieldSecondary}>{fecha_compromiso}</Text>
            <MaterialCommunityIcons
              name="calendar-export"
              size={16}
              color="#777"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fieldTerciary}
            >
              {descripcion_producto}
            </Text>
          </View>
          {/* Telefono */}
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={styles.fieldContainer}
              onPress={handlePhoneCall}
            >
              <Ionicons name="call" size={20} color="#145498" />
              <Text
                style={styles.fieldTel}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Llamar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fieldContainer}
              onPress={handleWhatsAppMessage}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#145498" />
              <Text
                style={styles.fieldTel}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Mensaje
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainerAlt}>
            <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
              {nombre_cliente}
            </Text>
          </View>
        </Card.Content>
        <TouchableOpacity style={styles.optionButton} onPress={() => setIsModalVisible(true)}>
            <Ionicons name="open-outline" size={22} color="#145498" />
          </TouchableOpacity>
      </Card>
      {/* Modal para editar y ver detalles de la orden */}
      <OrdenModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        ordenData={{
          folio,
          nombre_producto,
          nombre_cliente,
          // Resto de la información de la orden
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fatherContainer: {
    alignItems: "center",
  },
  card: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: "98%",
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldContainerAlt: {
    alignItems: "flex-end",
  },
  fieldContainerAltStart: {
    alignItems: "flex-start",
  },
  fieldPrimary: {
    fontFamily: "jakarta-bold",
    fontSize: 16,
    marginLeft: 5,
    color: "#333",
  },
  fieldPrimaryID: {
    fontFamily: "jakarta-bold",
    fontSize: 16,
    marginLeft: 1,
    color: "#145498",
  },
  fieldTel: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    marginLeft: 1,
    marginEnd: 5,
    color: "#145498",
  },
  fieldSecondary: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    marginLeft: 5,
    color: "#777",
  },
  fieldTerciary: {
    fontFamily: "jakarta-regular",
    fontSize: 16,
    marginLeft: 5,
    color: "#777",
  },
  fieldTerciaryAlt: {
    fontFamily: "jakarta-light",
    fontSize: 16,
    color: "#777",
    textAlign: "right",
  },
  opaqueText: {
    opacity: 0.7,
  },
  optionButton: {
    position: "absolute",
    top: 10,
    right: 5,
    padding: 1,
  },
  // New styles for different estado conditions
  estadoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  estadoText: {
    fontFamily: "jakarta-regular",
    fontSize: 16,
    marginLeft: 5,
  },
  estadoIcon: {
    marginRight: 1,
  },
  ordenEstado: {
    color: "#2B7AA5", // Customize the style for "orden" estado
  },
  trabajoEstado: {
    color: "orange", // Customize the style for "trabajo" estado
  },
  finalizadaEstado: {
    color: "#952B8A", // Customize the style for "finalizada" estado
  },
  entregadaEstado: {
    color: "green", // Customize the style for "entregada" estado
  },
  defaultEstado: {
    color: "black", // Default style when no condition matches
  },
  inputsContainer: {
    marginTop: 40, // Agregar el margen superior deseado aquí
  },
  //MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  fieldPrimary: {
    fontFamily: "jakarta-bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  fieldTerciaryAlt: {
    fontFamily: "jakarta-light",
    fontSize: 16,
    marginBottom: 10,
    color: "#777",
  },
  editButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#145498",
    borderRadius: 5,
  },
  // Estilos para el botón "Guardar cambios"
  saveButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green", // Puedes personalizar el color para "Guardar cambios"
    borderRadius: 5,
  },
  // Estilos para el botón "Cerrar"
  closeButton: {
    position: "absolute",
    top: 5,
    right: 3,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "#B92D4F",
    borderRadius: 5,
  },
  ButtonText: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    color: "#fff",
  },
});

export default OrdenItem;
