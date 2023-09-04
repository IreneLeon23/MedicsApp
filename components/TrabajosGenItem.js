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
import { TextInput } from "react-native-paper";

const TrabajosGenItem = ({
  id_trabajo,
  fk_orden_cotizacion,
  nombre_trabajo,
  descripcion,
  horas_trabajo,
  importe,
  dificultad,
  costo_material,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [updatedNombreTrabajo, setUpdatedNombreTrabajo] = useState(nombre_trabajo);
  const [updatedDescripcion, setUpdatedDescripcion] = useState(descripcion);
  const [updatedHorasTrabajo, setUpdatedHorasTrabajo] = useState(horas_trabajo);
  const [updatedImporte, setUpdatedImporte] = useState(importe);
  const [updatedDificultad, setUpdatedDificultad] = useState(dificultad);
  const [updatedCostoMaterial, setUpdatedCostoMaterial] = useState(costo_material);

  const toggleModal = () => {
    setShowDetails(!showDetails);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "nombre_trabajo":
        setUpdatedNombreTrabajo(value);
        break;
      case "descripcion":
        setUpdatedDescripcion(value);
        break;
      case "horas_trabajo":
        setUpdatedHorasTrabajo(value);
        break;
      case "importe":
        setUpdatedImporte(value);
        break;
      case "dificultad":
        setUpdatedDificultad(value);
        break;
      case "costo_material":
        setUpdatedCostoMaterial(value);
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = () => {
    const updatedData = {
      nombre_trabajo: updatedNombreTrabajo,
      descripcion: updatedDescripcion,
      horas_trabajo: updatedHorasTrabajo,
      importe: updatedImporte,
      dificultad: updatedDificultad,
      costo_material: updatedCostoMaterial,
    };


    fetch(`http://192.168.1.21:8080/workshop/trabajos/editTrabajo/${id_trabajo}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Cambios guardados:', data);
    })
    .catch(error => {
      console.error('Error al guardar cambios:', error);
    });

    setEditMode(false);
  };

  return (
    <View style={styles.fatherContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldPrimaryID}>{id_trabajo}</Text>
            <MaterialCommunityIcons name="tag" size={20} color="#145498" />
            <Text style={styles.fieldPrimary}>{nombre_trabajo}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fieldTerciary}
            >
              {descripcion}
            </Text>
          </View>
          <View style={styles.fieldContainerAlt}>
            <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
              fk: {fk_orden_cotizacion}
            </Text>
          </View>
        </Card.Content>
        <View style={styles.optionButton}>
          <TouchableOpacity
            style={styles.verMasButton}
            onPress={() => setShowDetails(true)}
          >
            <Ionicons name="open-outline" size={22} color="#145498" />
          </TouchableOpacity>
          <Modal
            visible={showDetails}
            animationType="slide"
            onRequestClose={() => setShowDetails(false)}
          >
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.fieldPrimary}>id de trabajo: {id_trabajo}</Text>

                <TextInput
                  style={[styles.input, styles.leftInput]}
                  value={editMode ? updatedNombreTrabajo : nombre_trabajo}
                  label={"Nombre de trabajo"}
                  onChangeText={value => handleInputChange("nombre_trabajo", value)}
                  mode="outlined"
                  activeOutlineColor="#145498"
                  disabled={!editMode}
                />

                <TextInput
                  style={[styles.input, styles.leftInput]}
                  value={editMode ? updatedDescripcion : descripcion}
                  label={"Descripción"}
                  onChangeText={value => handleInputChange("descripcion", value)}
                  mode="outlined"
                  activeOutlineColor="#145498"
                  disabled={!editMode}
                />

                <TextInput
                  style={[styles.input, styles.leftInput]}
                  value={editMode ? updatedHorasTrabajo : horas_trabajo}
                  label={"Horas de trabajo"}
                  onChangeText={value => handleInputChange("horas_trabajo", value)}
                  mode="outlined"
                  activeOutlineColor="#145498"
                  disabled={!editMode}
                />

                <TextInput
                  style={[styles.input, styles.leftInput]}
                  value={editMode ? updatedImporte : importe}
                  label={"Importe"}
                  onChangeText={value => handleInputChange("importe", value)}
                  mode="outlined"
                  activeOutlineColor="#145498"
                  disabled={!editMode}
                />

                <TextInput
                  style={[styles.input, styles.leftInput]}
                  value={editMode ? updatedDificultad : dificultad}
                  label={"Dificultad"}
                  onChangeText={value => handleInputChange("dificultad", value)}
                  mode="outlined"
                  activeOutlineColor="#145498"
                  disabled={!editMode}
                />

                <TextInput
                  style={[styles.input, styles.leftInput]}
                  value={editMode ? updatedCostoMaterial : costo_material}
                  label={"Costo de material"}
                  onChangeText={value => handleInputChange("costo_material", value)}
                  mode="outlined"
                  activeOutlineColor="#145498"
                  disabled={!editMode}
                />

                <TouchableOpacity
                  style={editMode ? styles.saveButton : styles.editButton}
                  onPress={toggleEditMode}
                >
                  <Text style={styles.ButtonText}>
                    {editMode ? "Cancelar" : "Editar"}
                  </Text>
                </TouchableOpacity>

                {editMode && (
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                  >
                    <Text style={styles.ButtonText}>Guardar Cambios</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    toggleEditMode();
                    toggleModal();
                  }}
                >
                  <Text style={styles.ButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </Card>
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
  //MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
   // Estilos para el botón "Editar"
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
    backgroundColor: "green", // Personaliza el color para "Guardar Cambios"
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

export default TrabajosGenItem;
