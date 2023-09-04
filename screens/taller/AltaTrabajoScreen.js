import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, StyleSheet } from 'react-native'; 
import TrabajosItem from '../../components/TrabajosItem';
import axios from 'axios'; // Importar Axios

const AltaTrabajoScreen = () => {
  const [fk_orden_cotizacion, setFkOrdenCotizacion] = useState('');
  const [nombre_trabajo, setNombreTrabajo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas_trabajo, setHorasTrabajo] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [costo_material, setCostoMaterial] = useState('');

  const importe = parseFloat(horas_trabajo) * parseFloat(dificultad) + parseFloat(costo_material);

  const [trabajos, setTrabajos] = useState([]);

  const handleAddTrabajo = async () => {
    const nuevoTrabajo = {
        fkOrdenCotizacion: fk_orden_cotizacion,
        nombreTrabajo: nombre_trabajo,
        descripcion: descripcion,
        horasTrabajo: horas_trabajo,
        importe: importe,
        dificultad: dificultad,
        costoMaterial: costo_material,
      };
  
      try {
        const response = await axios.post('http://192.168.1.21:8080/taller/trabajos/newTrabajo', nuevoTrabajo, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          // ... Manejar el éxito, tal vez obtener la lista actualizada de trabajos desde el servidor ...
          setTrabajos([...trabajos, nuevoTrabajo]);
          // Limpiar los campos del formulario
          setFkOrdenCotizacion('');
          setNombreTrabajo('');
          setDescripcion('');
          setHorasTrabajo('');
          setDificultad('');
          setCostoMaterial('');
        } else {
          console.error('Error al agregar el trabajo:', response.statusText);
        }
      } catch (error) {
        console.error('Error al agregar el trabajo:', error);
      }
    };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Agregar Nuevo Trabajo</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Orden Cotización"
          value={fk_orden_cotizacion}
          onChangeText={text => setFkOrdenCotizacion(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Trabajo"
          value={nombre_trabajo}
          onChangeText={text => setNombreTrabajo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={text => setDescripcion(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Horas de Trabajo"
          keyboardType="numeric"
          value={horas_trabajo}
          onChangeText={text => setHorasTrabajo(text)}
        />
        <Text style={styles.label}>Importe: {importe}</Text>
        <TextInput
          style={styles.input}
          placeholder="Dificultad"
          keyboardType="numeric"
          value={dificultad}
          onChangeText={text => setDificultad(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Costo de Material"
          keyboardType="numeric"
          value={costo_material}
          onChangeText={text => setCostoMaterial(text)}
        />
        <TouchableOpacity
                  style={styles.Button}
                  onPress={handleAddTrabajo}
                >
                  <Text style={styles.ButtonText}>Agregar Trabajo</Text>
                </TouchableOpacity>
       
      </View>

      <View style={styles.cardContainer}>
        {trabajos.map((trabajo, index) => (
          <TrabajosItem key={index} trabajo={trabajo} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerTitle: {
    fontFamily: "jakarta-medium",
    fontSize: 20,
    color: "#145498",
    marginBottom: 45, // Adjusted margin
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  cardContainer: {
    marginTop: 20,
  },
  Button: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#145498",
    borderRadius: 5,
  },
  ButtonText: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    color: "#fff"},

});

export default AltaTrabajoScreen;
