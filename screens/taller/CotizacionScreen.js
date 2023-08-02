import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Dimensions } from 'react-native'; // Importamos Dimensions desde react-native
import { DataTable, FAB } from 'react-native-paper';
import axios from "axios"; 

const CotizacionScreen = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const [editedData, setEditedData] = useState({
    nombre_cliente: "",
    estatus_orden: "",
    fecha_captura: "",
    fecha_compromiso: "",
    comentario_cotizacion: "",
    equipo: "",
    total: "", 
    nombre_usuario: "",
  });

  // Llamada a la API para obtener los datos de las cotizaciones
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.17:8080/workshop/cotizacion`) 
      .then((response) => {
        setCotizaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las cotizaciones:", error);
      });
  };

  // Función para manejar la edición de los datos
  const onEditPress = () => {
    setIsEditing(true);
    setEditedData({
      nombre_cliente: selectedCotizacion.nombre_cliente,
      estatus_orden: selectedCotizacion.estatus_orden,
      fecha_captura: selectedCotizacion.fecha_captura,
      fecha_compromiso: selectedCotizacion.fecha_compromiso,
      comentario_cotizacion: selectedCotizacion.comentario_cotizacion,
      equipo: selectedCotizacion.equipo,
      total: selectedCotizacion.total,
      nombre_usuario: selectedCotizacion.nombre_usuario,
    });
  };

  const onSavePress = () => {
    setSelectedCotizacion({
      ...selectedCotizacion,
      nombre_cliente: editedData.nombre_cliente,
      estatus_orden: editedData.estatus_orden,
      fecha_captura: editedData.fecha_captura,
      fecha_compromiso: editedData.fecha_compromiso,
      comentario_cotizacion: editedData.comentario_cotizacion,
      equipo: editedData.equipo,
      total: editedData.total,
      nombre_usuario: editedData.nombre_usuario,
    });
    setIsEditing(false);
  };

  const onCancelPress = () => {
    setIsEditing(false);
    setEditedData({
        nombre_cliente: "",
        estatus_orden: "",
        fecha_captura: "",
        fecha_compromiso: "",
        comentario_cotizacion: "",
        equipo: "",
        total: "", 
        nombre_usuario: "",
    });
  };

  // Renderizar los elementos de la lista
  const renderTableItem = ({ item }) => (
    <DataTable.Row>
      <DataTable.Cell>{item.folio}</DataTable.Cell>
      <DataTable.Cell>{item.nombre_cliente}</DataTable.Cell>
      <DataTable.Cell>{item.estatus_orden}</DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity onPress={() => setSelectedCotizacion(item)}>
          <Text style={{ color: 'blue' }}>Ver más</Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );
  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Cotizaciones
      </Text>

  
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Folio</DataTable.Title>
          <DataTable.Title>Cliente</DataTable.Title>
          <DataTable.Title>Estatus</DataTable.Title>
          <DataTable.Title>Ver más</DataTable.Title>
        </DataTable.Header>
  
        <FlatList
          data={cotizaciones}
          keyExtractor={(item) => item.folio}
          renderItem={renderTableItem} // Usamos renderTableItem para mostrar solo los primeros tres campos en la tabla
        />
      </DataTable>

       <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        label="Nueva cotización"
        onPress={() => {
          // Implementa la navegación para abrir el formulario de nueva cotización
          // Puedes utilizar React Navigation para esto
          
        }}
      />

<Modal
        visible={selectedCotizacion !== null}
        onRequestClose={() => setSelectedCotizacion(null)}
        transparent
      >
        <View style={styles.modalContainer}>
          {selectedCotizacion && (
            <View style={[styles.modalContent, { width: windowWidth - 32 }]}>
              {isEditing ? (
                <>
                 <TextInput
                    style={styles.input}
                    value={editedData.nombre_cliente}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, nombre_cliente: text })
                    }
                  />
                   <TextInput
                    style={styles.input}
                    value={editedData.estatus_orden}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, estatus_orden: text })
                    }
                  />
                   <TextInput
                    style={styles.input}
                    value={editedData.fecha_captura}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, fecha_captura: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    value={editedData.fecha_compromiso}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, fecha_compromiso: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    value={editedData.comentario_cotizacion}
                    onChangeText={(text) =>
                      setEditedData({
                        ...editedData,
                        comentario_cotizacion: text,
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    value={editedData.equipo}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, equipo: text })
                    }
                  />
                   <TextInput
                    style={styles.input}
                    value={editedData.total}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, total: text })
                    }
                  />
                   <TextInput
                    style={styles.input}
                    value={editedData.nombre_usuario}
                    onChangeText={(text) =>
                      setEditedData({ ...editedData, nombre_usuario: text })
                    }
                  />
                </>
              ) : (
                <>
                  <Text style={styles.label}>Folio:</Text>
            <Text style={styles.text}>{selectedCotizacion.folio}</Text>

            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.text}>{selectedCotizacion.nombre_cliente}</Text>

            <Text style={styles.label}>Estatus:</Text>
            <Text style={styles.text}>{selectedCotizacion.estatus_orden}</Text>

            <Text style={styles.label}>Fecha Captura:</Text>
            <Text style={styles.text}>{selectedCotizacion.fecha_captura}</Text>

            <Text style={styles.label}>Fecha Compromiso:</Text>
            <Text style={styles.text}>{selectedCotizacion.fecha_compromiso}</Text>

            <Text style={styles.label}>Comentario:</Text>
            <Text style={styles.text}>{selectedCotizacion.comentario_cotizacion}</Text>

            <Text style={styles.label}>Equipo:</Text>
            <Text style={styles.text}>{selectedCotizacion.equipo}</Text>

            <Text style={styles.label}>Total:</Text>
            <Text style={styles.text}>{selectedCotizacion.total}</Text>

            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.text}>{selectedCotizacion.nombre_usuario}</Text>

                </>
              )}

              {isEditing ? (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onCancelPress}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={onSavePress}
                  >
                    <Text style={styles.buttonText}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={onEditPress}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedCotizacion(null)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... Estilos anteriores ...
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center', // Center the content horizontally
  },
  label: {
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Alinear a la izquierda
    marginBottom: 4, // Espacio entre etiquetas
  },
  text: {
    alignSelf: 'flex-start', // Alinear a la izquierda
    marginBottom: 8, // Espacio entre campos
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  button: {
    borderRadius: 8,
    padding: 8,
    width: '45%',
  },
  closeButtonText:{
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#145498',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#145498',
    padding: 8,
    borderRadius: 8,
    marginTop: 16, // Add some space between the content and the button
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CotizacionScreen;
