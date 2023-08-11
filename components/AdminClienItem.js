import React, { useState,  useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  ScrollView,
  
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";


const AdminClienItem = ({
clave_cliente,
nombre,
telefono,
whatsapp,
correo,
direccion,
}) => {

  const [showDetails, setShowDetails] = useState(false); 
  const [editMode, setEditMode] = useState(false);

  const [updatedNombre, setUpdatedNombre] = useState(nombre);
  const [updatedTelefono, setUpdatedTelefono] = useState(telefono);
  const [updatedWhatsapp, setUpdatedWhatsapp] = useState(whatsapp);
  const [updatedCorreo, setUpdatedCorreo] = useState(correo);
  const [updatedDireccion, setUpdatedDireccion] = useState(direccion);
 

  const toggleModal = () => {
    setShowDetails(!showDetails);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    // ... Actualiza los valores de tus estados con los nuevos valores editados ...

    // Finaliza el modo de edición después de guardar
    setEditMode(false);
  };
  const handlePhoneCall = () => {
    const phoneUrl = `tel:${telefono}`;
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
    const whatsAppUrl = `whatsapp://send?phone=${whatsapp}`;
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
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldPrimaryID}>{clave_cliente}</Text>
            <MaterialCommunityIcons name="tag" size={20} color="#145498" />
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
          </View>

          <View style={styles.fieldContainerAlt}>
  <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
  {nombre}
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
              <Text style={styles.fieldPrimary}>Clave cliente: {clave_cliente}</Text>

                <TextInput
              style={[styles.input, styles.leftInput]}
              value={editMode ? updatedNombre: nombre}
              label={"Usuario"}
              onChangeText={setUpdatedNombre}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={!editMode}
            />
                <TextInput
              style={[styles.input, styles.leftInput]}
              value={editMode ? updatedTelefono: telefono}
              label={"Telefono"}
              onChangeText={setUpdatedTelefono}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={!editMode}
            /> 
 <TextInput
              style={[styles.input, styles.leftInput]}
              value={editMode ? updatedWhatsapp: whatsapp}
              label={"Whatsapp"}
              onChangeText={setUpdatedWhatsapp}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled={!editMode}
            />
 <TextInput
          style={[styles.input, styles.leftInput]}
          value={editMode ? updatedCorreo: correo}
          label={"Correo"}
          onChangeText={setUpdatedCorreo}
          mode="outlined"
          activeOutlineColor="#145498"
          disabled={!editMode}
        />  
       
      <TextInput
      style={[styles.input, styles.leftInput]}
      value={editMode ? updatedDireccion: direccion}
      label={"Direccion"}
      onChangeText={setUpdatedDireccion}
      mode="outlined"
      activeOutlineColor="#145498"
      disabled={!editMode}
    /> 
            
                <TouchableOpacity
            style={editMode ? styles.saveButton : styles.editButton} // Cambia el estilo si está en modo de edición
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

export default AdminClienItem;
