import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  handlePhoneCall,
  handleWhatsAppMessage,
} from "./clientUtils";
import ClientModal from "./ClientModal"; // Asegúrate de que el nombre coincida

const ClientItem = ({
  clave_cliente,
  nombre,
  telefono,
  whatsapp,
  correo,
  direccion,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.fatherContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldPrimary}>{nombre} </Text>
          </View>
          <View style={styles.fieldContainer}>
          <Text style={styles.fieldSecondary}>{correo} </Text>
          </View>
          <View style={styles.fieldContainer}>
          <Text style={styles.fieldTerciary}>{direccion} </Text>
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
            <MaterialCommunityIcons name="tag" size={20} color="#145498" />
               {clave_cliente}
            </Text>
          </View>
        </Card.Content>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="open-outline" size={22} color="#145498" />
        </TouchableOpacity>
      </Card>
      {/* Modal para editar y ver detalles de la orden */}
      <ClientModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        clientData={{
          clave_cliente,
          nombre,
          telefono,
          whatsapp,
          correo,
          direccion,
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

export default ClientItem;
