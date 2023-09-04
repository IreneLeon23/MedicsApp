import React, { useState, useEffect } from "react";
import { View, ScrollView, Modal, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);
import axios from "axios"; // Importa axios si no lo has hecho ya
import TrabajosItem from "./TrabajosItem"; // Asegúrate de proporcionar la ruta correcta

const OrdenModal = ({ visible, onClose, ordenData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedOrdenData, setUpdatedOrdenData] = useState({ ...ordenData });
  const [trabajoInfo, setTrabajoInfo] = useState([]);
  const [showTipoMantenimientoDropDown, setShowTipoMantenimientoDropDown] =
    useState(false);


  const handleSaveChanges = () => {
    console.log("Valor de updatedOrdenData.folio:", updatedOrdenData.folio); // Agregar este console.log
    // Realizar una petición PUT para actualizar la orden
    axios
      .put(
        `http://192.168.1.21:8080/taller/orders/editOrden/${updatedOrdenData.folio}`,
        updatedOrdenData
      )
      .then((response) => {
        console.log("Orden actualizada exitosamente:", response.data);
        // Actualizar los datos de la orden en la interfaz, si es necesario
        // Puedes realizar una nueva petición para obtener los datos actualizados si lo deseas
      })
      .catch((error) => {
        console.error("Error al actualizar la orden:", error);
      });
  };
  useEffect(() => {
    // Resto del código de useEffect para cargar información de trabajos
  }, [ordenData.folio]);

  useEffect(() => {
    // Cargar información de trabajos al montar el componente
    axios
      .get(
        `http://192.168.1.21:8080/taller/trabajos/getTrabajo?fk_orden_cotizacion=${ordenData.folio}`
      )
      .then((response) => {
        setTrabajoInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información del trabajo en relación a la orden:", error);
      });
  }, [ordenData.folio]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <PaperProvider>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Mostrar el campo "Folio" */}
            <View style={styles.inputsContainer}>
               {/* Editar campos directamente en el formulario */}
               <TextInput
                style={styles.input}
                label="Nombre del Producto"
                value={updatedOrdenData.nombre_producto}
                onChangeText={(text) =>
                  setUpdatedOrdenData((prevData) => ({
                    ...prevData,
                    nombre_producto: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />

              <TextInput
                style={styles.input}
                label="Nombre del Cliente"
                value={updatedOrdenData.nombre_cliente}
                onChangeText={(text) =>
                  setUpdatedOrdenData((prevData) => ({
                    ...prevData,
                    nombre_cliente: text,
                  }))
                }
                mode="outlined"
                activeOutlineColor="#145498"
                editable={isEditing} // Habilitar edición si isEditing es true
              />

              {/* Agregar más campos aquí... */}

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
                      setUpdatedOrdenData({ ...ordenData });
                      setIsEditing(false);
                    }}
                  >
                    <Text style={styles.ButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>


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
      </PaperProvider>
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
};

export default OrdenModal;
