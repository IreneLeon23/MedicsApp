import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import OrdenItem from '../../components/OrdenItem';
import {DB_HOST} from "@env"
const OrdenesServicioScreen = () => {
  const [ordenes, setOrdenes] = useState([]);
  const serverIP = DB_HOST;

  useEffect(() => {
    // Realizar la petición para obtener los campos de la tabla ordenes_servicio
    axios
      .get(`http://${serverIP}:8080/workshop/ordenes`)
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las ordenes de servicio:', error);
      });
  }, []);

  const renderOrdenItem = ({ item }) => {
    return (
      <OrdenItem
        id={item.id_orden}
        fk_producto={item.fk_producto}
        fk_usuario={item.fk_usuario}
        descripcion={item.descripcion}
        fecha={item.fecha}
        costo_reparacion={item.costo_reparacion}
        estado={item.estado}
        observaciones={item.observaciones}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Ordenes de Servicio</Text>
      <FlatList
        data={ordenes}
        keyExtractor={(item) => item.id_orden.toString()}
        renderItem={renderOrdenItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#37414d',
  },
});

export default OrdenesServicioScreen;
