import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import ExpedienteModal from "./ExpedienteModal";

const ExpedienteItem = ({
  id_expediente,
  folio,
  descripcion_equipo,
  // nombre_usuario,
  nombre_cliente,
  // telefono_cliente,
  // whatsapp_cliente,
  // direccion_cliente,
  fecha_entrada,
  fecha_entrega,
  // foto_equipo,
  tiempo_taller,
  costo_reparacion,
  tiempo_proximo_servicio,
  // estado_equipo,
  notas_cliente,
  comentarios_internos,
  razon_reparacion,
  observaciones,
  sugerencias,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formattedFechaEntrada = new Date(fecha_entrada).toLocaleDateString(
    "es-ES"
  );
  const formattedFechaEntrega = new Date(fecha_entrega).toLocaleDateString(
    "es-ES"
  );

  return (
    <View style={styles.fatherContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldPrimaryID}>{folio}</Text>
            <MaterialCommunityIcons name="tag" size={20} color="#145498" />
            <Text style={styles.fieldPrimaryID}>{id_expediente}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldSecondary}>{formattedFechaEntrada}</Text>
            <MaterialCommunityIcons
              name="calendar-import"
              size={16}
              color="#777"
            />
            <Text style={styles.fieldSecondary}>{formattedFechaEntrega}</Text>
            <MaterialCommunityIcons
              name="calendar-export"
              size={16}
              color="#777"
            />
          </View>

          <View style={styles.fieldContainer}>
            {/* <Ionicons name="chatbubble-outline" size={24} color="#145498" /> */}
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fieldTerciary}
            >
              {descripcion_equipo}
            </Text>
          </View>

          <View style={styles.fieldContainerAlt}>
            <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
              {nombre_cliente}
            </Text>
          </View>
        </Card.Content>
        <View style={styles.optionButton}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="open-outline" size={22} color="#145498" />
          </TouchableOpacity>
        </View>
      </Card>
      <ExpedienteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        expedienteData={{
          id_expediente,
          folio,
          fecha_entrada,
          fecha_entrega,
          tiempo_taller,
          costo_reparacion,
          tiempo_proximo_servicio,
          notas_cliente,
          comentarios_internos,
          razon_reparacion,
          observaciones,
          sugerencias,
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
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#145498",
    borderRadius: 5,
  },
  closeButtonText: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    color: "#fff",
  },
});

export default ExpedienteItem;
