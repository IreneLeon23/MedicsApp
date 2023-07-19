import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from "axios";

const ReportesScreen = () => {
  const [reportes, setReportes] = useState([]);
  const [articuloMasReparado, setArticuloMasReparado] = useState([]);
  const [motivoReparacion, setMotivoReparacion] = useState([]);
  const [usuariosData, setUsuariosData] = useState([]);
  const [clientesData, setClientesData] = useState([]);

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.0.18:8080/workshop/cliente`)
      .then((response) => {
        const { result1, result2, result3, result4 } = response.data;
        setArticuloMasReparado(result1 || []);
        setMotivoReparacion(result2 || []);
        setUsuariosData(result3);
        setClientesData(result4);
      })
      .catch((error) => {
        console.error("Error al obtener los reportes:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Artículo más reparado</Text>
        {articuloMasReparado.map((articulo, index) => (
          <Text key={index}>{articulo.nombre}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Motivo por el que se repara más</Text>
        {motivoReparacion.map((motivo, index) => (
          <Text key={index}>{motivo.tipo_mantenimiento}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Usuarios - Más reparaciones</Text>
        {usuariosData.map((usuario, index) => (
          <Text key={index}>{usuario.nombre}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clientes - Más reparaciones</Text>
        {clientesData.map((cliente, index) => (
          <Text key={index}>{cliente.nombre}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ReportesScreen;
