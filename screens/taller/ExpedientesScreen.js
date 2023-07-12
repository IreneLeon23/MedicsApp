import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import ExpedienteItem from '../../components/ExpedienteItem';
import {DB_HOST} from "@env"
const ExpedientesScreen = () => {
  const [expedientes, setExpedientes] = useState([]);
  const serverIP = DB_HOST;
  useEffect(() => {
    // Realizar la petición para obtener los expedientes
    axios
      .get(`http://${serverIP}:8080/workshop/expedientes`)
      .then((response) => {
        setExpedientes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los expedientes:', error);
      });
  }, []);

  const renderExpedienteItem = ({ item }) => {
    return (
      <ExpedienteItem
        id={item.id_expediente}
        fechaEntrada={item.fecha_entrada}
        fechaEntrega={item.fecha_entrega}
        fkServicio={item.fk_servicio}
        fkUsuario={item.fk_usuario}
        direccion={item.direccion}
        fotoEquipo={item.foto_equipo}
        tiempoTaller={item.tiempo_taller}
        costoReparacion={item.costo_reparacion}
        tiempoProximoServicio={item.tiempo_proximo_servicio}
        estadoEquipo={item.estado_equipo}
        descripcionEquipo={item.descripcion_equipo}
        notasCliente={item.notas_cliente}
        comentariosInternos={item.comentarios_internos}
        razonReparacion={item.razon_reparacion}
        observaciones={item.observaciones}
        sugerencias={item.sugerencias}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Expedientes de Servicio</Text>
      <FlatList
        data={expedientes}
        keyExtractor={(item) => item.id_expediente.toString()}
        renderItem={renderExpedienteItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#37414d',
  },
});

export default ExpedientesScreen;
