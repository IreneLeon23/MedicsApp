import React, { useState, useEffect } from "react";
import { View, ScrollView, Modal, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Importa axios si no lo has hecho ya
import TrabajosItem from "./TrabajosItem"; // Asegúrate de proporcionar la ruta correcta

const OrdenModal = ({ visible, onClose, ordenData }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedFolio, setUpdatedFolio] = useState(ordenData.folio);
  const [updatedNombreProducto, setUpdatedNombreProducto] = useState(
    ordenData.nombre_producto
  );
  const [updatedNombreCliente, setUpdatedNombreCliente] = useState(
    ordenData.nombre_cliente
  );
  const [trabajoInfo, setTrabajoInfo] = useState([]);

  const handleSaveChanges = () => {
    // ... Lógica para guardar los cambios ...
    setEditMode(false);
  };

  useEffect(() => {
    // Cargar información de trabajos al montar el componente
    axios
      .get(
        `http://192.168.1.14:8080/workshop/trabajos?fk_orden_cotizacion=${ordenData.folio}`
      )
      .then((response) => {
        setTrabajoInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información del trabajo:", error);
      });
  }, [ordenData.folio]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Show TextInput for each field */}
          <View style={styles.inputsContainer}>
            <TextInput
              style={[styles.input, styles.leftInput]}
              value={
                editMode ? updatedFolio.toString() : ordenData.folio.toString()
              }
              label={"Folio"}
              onChangeText={setUpdatedFolio}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={!editMode}
            />

            <TextInput
              style={[styles.input, styles.leftInput]}
              value={
                editMode ? updatedNombreProducto : ordenData.nombre_producto
              }
              label={"Nombre del Producto"}
              onChangeText={setUpdatedNombreProducto}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={!editMode}
            />

            <TextInput
              style={[styles.input, styles.leftInput]}
              value={editMode ? updatedNombreCliente : ordenData.nombre_cliente}
              label={"Nombre del Cliente"}
              onChangeText={setUpdatedNombreCliente}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={!editMode}
            />
          </View>

          {/* Botón de "Editar" o "Guardar cambios" */}
          <TouchableOpacity
            style={editMode ? styles.saveButton : styles.editButton}
            onPress={editMode ? handleSaveChanges : () => setEditMode(true)}
          >
            <Text style={styles.ButtonText}>
              {editMode ? "Guardar Cambios" : "Editar"}
            </Text>
          </TouchableOpacity>

          {/* Mostrar trabajos relacionados */}
          <View style={styles.trabajosContainer}>
            <Text style={styles.trabajosTitle}>Trabajos Relacionados:</Text>
            {trabajoInfo.map((trabajo) => (
              <TrabajosItem
                key={trabajo.id_trabajo}
                trabajo={{
                  id_trabajo: trabajo.id_trabajo,
                  fk_orden_cotizacion: trabajo.fk_orden_cotizacion,
                  nombre_trabajo: trabajo.nombre_trabajo,
                  descripcion: trabajo.descripcion,
                  horas_trabajo: trabajo.horas_trabajo,
                  importe: trabajo.importe,
                  dificultad: trabajo.dificultad,
                  costo_material: trabajo.costo_material,
                }}
              />
            ))}
          </View>

          {/* Botón de "Cerrar" */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.ButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inputsContainer: {
    marginTop: 40,
  },
  editButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#145498",
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    borderRadius: 5,
  },
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
  trabajosContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
  },
  trabajosTitle: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
};

export default OrdenModal;
