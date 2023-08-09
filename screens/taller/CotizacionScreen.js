
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { FAB, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CotizacionScreen = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const [showModal, setShowModal] = useState(false);
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

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.7:8080/workshop/cotizacion`) 
      .then((response) => {
        setCotizaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las cotizaciones:", error);
      });
  };

  // Function to filter cotizaciones based on the search query
  const filteredCotizaciones = cotizaciones.filter(
    (cotizacion) =>
      cotizacion.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cotizacion.equipo.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const onViewMorePress = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setShowModal(true);
  };
  
  const renderCotizacionCard = ({ item }) => {
    const { folio, equipo, fecha_captura, comentario_cotizacion, nombre_cliente} = item; // Destructure the item data
  
    return (
      <View style={styles.fatherContainer}>
        <Card style={styles.card}>
          <Card.Content>
            {/* Mostrar el folio */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldPrimary}>{folio}</Text>
            </View>
  
            {/* Mostrar el equipo */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldPrimary}>{equipo}</Text>
            </View>
  
            {/* Mostrar la fecha */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldSecondary}>{fecha_captura}</Text>
              <Ionicons name="calendar-outline" size={16} color="#777" />
            </View>
  
            <View style={styles.fieldContainer}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.fieldTerciary}>
                {comentario_cotizacion}
              </Text>
            </View>
  
            <View style={styles.fieldContainerAlt}>
              <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
                {nombre_cliente}
              </Text>
            </View>
          </Card.Content>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => onViewMorePress(item)}
          >
            <Ionicons name="open-outline" size={22} color="#145498" />
          </TouchableOpacity>
        </Card>
      </View>
    );
  };
  const navigation = useNavigation();

  const onNewCotizacionPress = () => {
    navigation.navigate('NuevaCotizacion');
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por cliente o equipo..."
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={{ color: "white" }}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCotizaciones}
        keyExtractor={(item) => item.folio}
        renderItem={renderCotizacionCard}
      />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        label="Nueva cotización"
        onPress={onNewCotizacionPress}
      />

<FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        label="Nueva cotización"
        onPress={onNewCotizacionPress}
      />

      {/* Modal */}
      {/* Modal */}
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
      >
        <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
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
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  fatherContainer: {
    alignItems: "center",
  },
  card: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: '98%',
    marginVertical: 10,
    shadowColor: '#171717',
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
  },searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    flex: 1,
    height: 40,
    backgroundColor: "#fffd",
    borderRadius: 4,
    paddingHorizontal: 15,
    position: "relative",
    elevation: 10,
    marginRight: 5,
  },
  filterButton: {
    backgroundColor: "#145498",
    borderRadius: 30,
    padding: 10,
  },
},);

export default CotizacionScreen;
