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

const ClientModal = ({
  visible,
  onClose,
  clientData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedClientData, setUpdatedClientData] = useState({ ...clientData });

  useEffect(() => {
    // Actualiza el estado de updatedClientData cuando cambia la prop clientData
    setUpdatedClientData({ ...clientData });
  }, [clientData]);

  const handleSaveChanges = () => {
    console.log(
      "Valor de updatedClientData.clave_cliente:",
      updatedClientData.clave_cliente
    );
    axios
      .put(
        `http://192.168.1.10:8080/admin/update/${updatedClientData.clave_cliente}`,
        updatedClientData
      )
      .then((response) => {
        console.log("Cliente editado exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el cliente:", error);
      });
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <PaperProvider>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.inputsContainer}>
              {/* Editar campos directamente en el formulario */}
              <TextInput
                style={styles.input}
                label="Nombre"
                value={updatedClientData.nombre}
                onChangeText={(text) =>
                  setUpdatedClientData((prevData) => ({
                    ...prevData,
                    nombre: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />
              <TextInput
                style={styles.input}
                label="Telefono"
                value={updatedClientData.telefono}
                onChangeText={(text) =>
                  setUpdatedClientData((prevData) => ({
                    ...prevData,
                    telefono: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />
              <TextInput
                style={styles.input}
                label="Whatsapp"
                value={updatedClientData.whatsapp}
                onChangeText={(text) =>
                  setUpdatedClientData((prevData) => ({
                    ...prevData,
                    whatsapp: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />
              <TextInput
                style={styles.input}
                label="Correo"
                value={updatedClientData.correo}
                onChangeText={(text) =>
                  setUpdatedClientData((prevData) => ({
                    ...prevData,
                    correo: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />
              <TextInput
                style={styles.input}
                label="Direccion"
                value={updatedClientData.direccion}
                onChangeText={(text) =>
                  setUpdatedClientData((prevData) => ({
                    ...prevData,
                    direccion: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />
            </View>
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
                      setUpdatedClientData({ ...clientData });
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

export default ClientModal; // Asegúrate de que el nombre coincida

