import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import axios from "axios"; // Asegúrate de importar axios aquí si no lo has hecho ya

const ExpedienteModal = ({ visible, onClose, expedienteData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedExpedienteData, setUpdatedExpedienteData] = useState({
    ...expedienteData,
  });
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    setUpdatedExpedienteData({ ...expedienteData });
  }, [expedienteData]);

  const handleSaveChanges = () => {
    console.log(
      "Valor de updatedExpedienteData:",
      updatedExpedienteData.id_expediente
    );
    axios
      .put(
        `http://192.168.1.21:8080/taller/expedientes/editExpediente/${updatedExpedienteData.id_expediente}`,
        updatedExpedienteData
      )
      .then((response) => {
        console.log("Expediente editado exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el expediente:", error);
      });
  };
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <PaperProvider>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TextInput
              style={styles.input}
              label="ID Expediente"
              value={updatedExpedienteData.id_expediente.toString()}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  id_expediente: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={true}
            />
            <TextInput
              style={styles.input}
              label="Folio de orden"
              value={updatedExpedienteData.folio.toString()}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  folio: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={true}
            />
            <TextInput
              style={styles.input}
              label="Costo reparación"
              value={updatedExpedienteData.costo_reparacion}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  costo_reparacion: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />
            <TextInput
              style={styles.input}
              label="Tiempo prox. servicio"
              value={updatedExpedienteData.tiempo_proximo_servicio}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  tiempo_proximo_servicio: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />
            <TextInput
              style={styles.input}
              label="Notas cliente"
              value={updatedExpedienteData.notas_cliente}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  notas_cliente: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />
            <TextInput
              style={styles.input}
              label="Comentarios internos"
              value={updatedExpedienteData.comentarios_internos}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  comentarios_internos: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />
            <TextInput
              style={styles.input}
              label="Razon reparacion"
              value={updatedExpedienteData.razon_reparacion}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  razon_reparacion: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />
            <TextInput
              style={styles.input}
              label="Observaciones"
              value={updatedExpedienteData.observaciones}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  observaciones: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />
            <TextInput
              style={styles.input}
              label="sugerencias"
              value={updatedExpedienteData.sugerencias}
              onChangeText={(text) =>
                setUpdatedExpedienteData((prevData) => ({
                  ...prevData,
                  sugerencias: text,
                }))
              }
              mode="outlined"
              activeOutlineColor="#145498"
              editable={isEditing} // Habilitar edición si isEditing es true
            />

            {/* Botones */}
            <View style={styles.buttonsContainer}>
              {!isEditing && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.ButtonText}>Editar</Text>
                </TouchableOpacity>
              )}

              {isEditing && (
                <>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                  >
                    <Text style={styles.ButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setUpdatedExpedienteData({ ...expedienteData });
                      setIsEditing(false);
                    }}
                  >
                    <Text style={styles.ButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          {/* Botón de "Cerrar" */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.ButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </PaperProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    borderRadius: 5,
    marginRight: 10, // Espacio a la derecha del botón de "Guardar Cambios"
    marginLeft: 10,
  },
  closeButton: {
    flex: 1,
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
  cancelButton: {
    flex: 1,
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B92D4F",
    borderRadius: 5,
    marginRight: 10, // Espacio a la derecha del botón de "Guardar Cambios"
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "row", // Para que los botones estén en una fila
    justifyContent: "space-between", // Espacio uniforme entre los botones
    marginTop: 20,
  },
});

export default ExpedienteModal; // Asegúrate de que el nombre coincida
