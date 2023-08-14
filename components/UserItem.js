import React, { useState, useEffect } from "react";
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
import DropDown from "react-native-paper-dropdown";
import { Provider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import axios from "axios";
const UserItem = ({
  clave_usuario,
  nombre,
  privilegio,
  correo,
  password,
  estatus,
  descripcion,
  fetchData, // Agrega la función fetchData como una prop
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [updatedClaveUsuario, setUpdatedClaveUsuario] = useState(clave_usuario);
  const [updatedNombre, setUpdatedNombre] = useState(nombre);
  const [updatedPrivilegio, setUpdatedPrivilegio] = useState(privilegio);
  const [updatedCorreo, setUpdatedCorreo] = useState(correo);
  const [updatedPassword, setUpdatedPassword] = useState(password);
  const [updatedEstatus, setUpdatedEstatus] = useState(estatus);
  const [updatedDescripcion, setUpdatedDescripcion] = useState(descripcion);

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedEstatus, setSelectedEstatus] = useState(estatus);

  const toggleModal = () => {
    setShowDetails(!showDetails);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const handleSaveChanges = async () => {
    try {
      const updatedUserData = {
        clave_usuario: updatedClaveUsuario,
        nombre: updatedNombre,
        privilegio: updatedPrivilegio,
        correo: updatedCorreo,
        password: updatedPassword,
        estatus: selectedEstatus,
        descripcion: updatedDescripcion,
      };

      const response = await axios.put(
        `http://192.168.1.10:8080/admin/updateUser/${clave_usuario}`,
        updatedUserData
      );

      if (response.status === 200) {
        // Llama a la función fetchData para actualizar la lista de usuarios
        fetchData();
      } else {
        console.error("Error al actualizar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }

    // Finaliza el modo de edición después de guardar
    setEditMode(false);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.1.10:8080/admin/deleteUser/${clave_usuario}`
      );

      if (response.status === 200) {
        // Llama a la función fetchData para actualizar la lista de usuarios
        fetchData();
      } else {
        console.error("Error al eliminar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    toggleDeleteModal();
  };
  return (
    <Provider>
      <View style={styles.fatherContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.fieldContainer}>
              {/* Modal de confirmación de eliminación */}
              <Modal
                visible={showDeleteModal}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleDeleteModal}
              >
                <View style={styles.DeleteModalContainer}>
                  <View style={styles.deleteModalContent}>
                    <Text style={styles.deleteModalText}>
                      ¿Estás seguro de que deseas eliminar este usuario?
                    </Text>
                    <View style={styles.deleteModalButtons}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={toggleDeleteModal}
                      >
                        <Text style={styles.deleteModalButtonText}>
                          Cancelar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleDeleteUser}
                      >
                        <Text style={styles.deleteModalButtonText}>
                          Confirmar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldPrimaryID}>{nombre}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldSecondary}>{privilegio}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTerciary}>{correo}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTerciaryAlt}>{descripcion}</Text>
            </View>

            <View style={styles.fieldContainerAlt}>
              <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
                <MaterialCommunityIcons name="tag" size={20} color="#145498" />
                {clave_usuario}
              </Text>
            </View>
          </Card.Content>
          {/* Botón de eliminar */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={toggleDeleteModal}
          >
            <Ionicons name="trash-outline" size={22} color="#e02b2b" />
          </TouchableOpacity>
          {/* Boton ver mas */}
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
                  <Text style={styles.fieldPrimary}>
                    Clave usuario: {clave_usuario}
                  </Text>
                  <TextInput
                    style={[styles.input, styles.leftInput]}
                    value={editMode ? updatedNombre : nombre}
                    label={"Usuario"}
                    onChangeText={setUpdatedNombre}
                    mode="outlined"
                    activeOutlineColor="#145498"
                    disabled={!editMode}
                  />
                  <TextInput
                    style={[styles.input, styles.leftInput]}
                    value={editMode ? updatedPrivilegio : privilegio}
                    label={"Privilegio"}
                    onChangeText={setUpdatedPrivilegio}
                    mode="outlined"
                    activeOutlineColor="#145498"
                    disabled={!editMode}
                  />

                  <TextInput
                    style={[styles.input, styles.leftInput]}
                    value={editMode ? updatedCorreo : correo}
                    label={"Correo"}
                    onChangeText={setUpdatedCorreo}
                    mode="outlined"
                    activeOutlineColor="#145498"
                    disabled={!editMode}
                  />
                  <TextInput
                    style={[styles.input, styles.leftInput]}
                    value={editMode ? updatedPassword : password}
                    label={"Contraseña"}
                    onChangeText={setUpdatedPassword}
                    mode="outlined"
                    activeOutlineColor="#145498"
                    disabled={!editMode}
                  />

                  <DropDown
                    label={"Estatus"}
                    mode={"outlined"}
                    visible={showDropDown} // Cambio aquí
                    showDropDown={() => setShowDropDown(true)} // Cambio aquí
                    onDismiss={() => setShowDropDown(false)} // Cambio aquí
                    value={selectedEstatus}
                    setValue={setSelectedEstatus}
                    list={[
                      { label: "Activo", value: "Activo" },
                      { label: "Inactivo", value: "Inactivo" },
                    ]}
                    theme={{
                      colors: {
                        primary: "#145498",
                        background: "#FFFFFF",
                        surface: "#FFFFFF",
                      },
                    }}
                  />
                  <TextInput
                    style={[styles.input, styles.leftInput]}
                    value={editMode ? updatedDescripcion : descripcion}
                    label={"Descripcion"}
                    onChangeText={setUpdatedDescripcion}
                    mode="outlined"
                    activeOutlineColor="#145498"
                    disabled={!editMode}
                  />
                  <TouchableOpacity
                    style={
                      editMode ? styles.cancelEditButton : styles.editButton
                    } // Cambia el estilo si está en modo de edición
                    onPress={() => setEditMode(!editMode)} // Cambia el estado de editMode
                  >
                    <Text style={styles.ButtonText}>
                      {editMode ? "Cancelar" : "Editar"}
                    </Text>
                  </TouchableOpacity>
                  {editMode && ( // Muestra el botón "Guardar Cambios" solo en modo de edición
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSaveChanges}
                    >
                      <Text style={styles.ButtonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                  )}
                  {/* Botón de "Cerrar" */}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      toggleEditMode(); // Sal del modo de edición si se cierra el modal
                      toggleModal(); // Cierra el modal
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
    </Provider>
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
  cancelEditButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B92D4F", // Personaliza el color para "Guardar Cambios"
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
  // Estilos para el botón de eliminar
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 30,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  // Estilos para el modal de confirmación de eliminación
  DeleteModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  deleteModalText: {
    fontFamily: "jakarta-regular",
    fontSize: 16,
    marginBottom: 20,
  },
  deleteModalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: "#666",
    borderRadius: 5,
  },
  confirmButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#08a045",
    borderRadius: 5,
  },
  deleteModalButtonText: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    color: "#fff",
  },
});

export default UserItem;
