import React, { Component, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import TrabajosGenItem from '../../components/TrabajosGenItem'; // Import the TrabajosGenItem component

class TrabajosGenScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      trabajos: [],
      selectedTrabajo: null,
      filtro: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`http://192.168.1.14:8080/workshop/trabajos`)
      .then((response) => {
        const trabajos = response.data;
        if (trabajos.length > 0) {
          this.setState({ trabajos, selectedTrabajo: trabajos[0] });
        }
      })
      .catch((error) => {
        console.error("Error al obtener los trabajos:", error);
      });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleTrabajoPress = (trabajo) => {
    this.setState({ selectedTrabajo: trabajo });
    this.toggleModal();
  };

  renderTrabajoItem = ({ item }) => (
    
    <TouchableOpacity style={styles.card} onPress={() => this.handleTrabajoPress(item)}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>ID Trabajo:</Text>
        <TextInput style={styles.fieldPrimaryID} value={item.id_trabajo.toString()} editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Orden Cotización:</Text>
        <TextInput style={styles.fieldTel} value={item.fk_orden_cotizacion.toString()} editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Nombre Trabajo:</Text>
        <TextInput style={styles.fieldSecondary} value={item.nombre_trabajo} editable={false} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldPrimary}>Descripción:</Text>
        <TextInput style={styles.fieldTerciary} value={item.descripcion} editable={false} />
      </View>
      {/* Add other fields here */}
    </TouchableOpacity>
  );

  render() {
    const { trabajos, selectedTrabajo, filtro } = this.state;

    return (
      <View style={styles.container}>
        {/* Search Bar Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <Ionicons name="search" size={24} color="#777" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              onChangeText={(text) => this.setState({ filtro: text })}
              value={filtro}
            />
          </View>
        </View>

        {/* FlatList */}
        <FlatList
          data={trabajos}
          keyExtractor={(item) => item.id_trabajo.toString()}
          renderItem={this.renderTrabajoItem}
          style={styles.flatList}
        />
        {/* Modal */}
       {/* Modal */}
       <Modal
          visible={this.state.isModalVisible}
          animationType="slide"
          onRequestClose={this.toggleModal}
        >
          {selectedTrabajo && (
            <TrabajosGenItem
              selectedTrabajo={selectedTrabajo}
              toggleModal={this.toggleModal}
            />
          )}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 40,
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
      
      opaqueText: {
        opacity: 0.7,
      },
      optionButton: {
        position: "absolute",
        top: 10,
        right: 5,
        padding: 1,
      },
     
});

export default TrabajosGenScreen;
