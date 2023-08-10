import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const TrabajosGenItem = ({ selectedTrabajo, toggleModal }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    setEditMode(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.modalContent}>
      {/* Render selectedTrabajo details here */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>ID Trabajo:</Text>
        <TextInput
          style={[styles.fieldPrimaryID, editMode && styles.editableInput]}
          value={selectedTrabajo.id_trabajo.toString()}
          editable={false}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Orden Cotización:</Text>
        <TextInput 
        style={[styles.fieldTel, editMode && styles.editableInput]} 
        value={selectedTrabajo.fk_orden_cotizacion.toString()} 
        editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Nombre Trabajo:</Text>
        <TextInput style={[styles.fieldSecondary, editMode && styles.editableInput]} 
        value={selectedTrabajo.nombre_trabajo} 
        editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Descripción:</Text>
        <TextInput style={[styles.fieldTerciary, editMode && styles.editableInput]} 
        value={selectedTrabajo.descripcion} 
        editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Horas de trabajo:</Text>
        <TextInput style={[styles.fieldTerciary, editMode && styles.editableInput]} 
        value={selectedTrabajo.horas_trabajo} 
        editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Importe:</Text>
        <TextInput style={[styles.fieldTerciary, editMode && styles.editableInput]} 
        value={selectedTrabajo.importe} 
        editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Costo del material:</Text>
        <TextInput style={[styles.fieldTerciary, editMode && styles.editableInput]} 
        value={selectedTrabajo.costo_material} 
        editable={false} />
      </View>
      {/* Button to close modal */}
       {/* Button to toggle edit mode */}
       <TouchableOpacity
        style={editMode ? styles.saveButton : styles.editButton}
        onPress={editMode ? handleSaveChanges : handleEditToggle}
      >
        <Text style={styles.ButtonText}>{editMode ? "Guardar Cambios" : "Editar"}</Text>
      </TouchableOpacity>
      
      {/* Button to close modal */}
      <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
        <Text style={styles.ButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldPrimary: {
    fontFamily: 'jakarta-bold',
    fontSize: 16,
    color: '#333',
    width: 130, // Adjust width as needed
  },
  fieldPrimaryID: {
    fontFamily: 'jakarta-bold',
    fontSize: 16,
    marginLeft: 5,
    color: '#145498',
  },
  fieldTel: {
    fontFamily: 'jakarta-semi-bold',
    fontSize: 16,
    marginLeft: 1,
    marginEnd: 5,
    color: '#145498',
  },
  fieldSecondary: {
    fontFamily: 'jakarta-semi-bold',
    fontSize: 16,
    marginLeft: 1,
    color: '#777',
  },
  fieldTerciary: {
    fontFamily: 'jakarta-regular',
    fontSize: 16,
    marginLeft: 1,
    color: '#777',
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
  editableInput: {
    backgroundColor: "#F4F4F4", // Background color in edit mode
    borderColor: "#145498", // Border color in edit mode
    borderWidth: 1,
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
    backgroundColor: "green", // Customize the color for saving changes
    borderRadius: 5,
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "80%",
  },
});

export default TrabajosGenItem;
