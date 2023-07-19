import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ExpedienteItem = ({
  id_expediente,
  fecha_entrada,
  fecha_entrega,
  fk_servicio,
  fk_usuario,
  descripcion_equipo,
  direccion,
  foto_equipo,
  tiempo_taller,
  costo_reparacion,
  tiempo_proximo_servicio,
  estado_equipo,
  notas_cliente,
  comentarios_internos,
  razon_reparacion,
  observaciones,
  sugerencias,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.fieldContainerRow}>
          <Ionicons name="document-text-outline" size={24} color="#145498" />
          <Text style={styles.fieldPrimary}>ID Expediente:</Text>
        </View>
        <Text style={styles.value}>{id_expediente}</Text>

        <View style={styles.fieldContainerRow}>
          <Ionicons name="calendar-outline" size={24} color="#145498" />
          <Text style={styles.fieldPrimary}>Descripción del equipo:</Text>
        </View>
        <Text style={styles.value}>{descripcion_equipo}</Text>

        <View style={styles.fieldContainerRow}>
          <Ionicons name="calendar-outline" size={24} color="#145498" />
          <Text style={styles.fieldPrimary}>Fecha de Entrega:</Text>
        </View>
        <Text style={styles.value}>{fecha_entrega}</Text>

        {/* Mostrar solo estos campos inicialmente */}
        {!showMore && (
          <>
            <View style={styles.fieldContainer}>
              <Ionicons name="cube-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>ID Servicio:</Text>
            </View>
            <Text style={styles.value}>{fk_servicio}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="person-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>ID Usuario:</Text>
            </View>
            <Text style={styles.value}>{fk_usuario}</Text>

            <View style={styles.fieldContainer}>
              <TouchableOpacity onPress={handleShowMore} style={styles.button}>
                <Text style={styles.buttonText}>Ver más</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Mostrar los datos adicionales al hacer clic en "Ver más" */}
        {showMore && (
          <>
            <View style={styles.fieldContainerRow}>
              <Ionicons name="calendar-outline" size={24} color="#145498" />
              <Text style={styles.fieldPrimary}>Fecha de Entrada:</Text>
            </View>
            <Text style={styles.value}>{fecha_entrada}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="location-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Dirección:</Text>
            </View>
            <Text style={styles.value}>{direccion}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="image-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Foto del Equipo:</Text>
            </View>
            <Text style={styles.value}>{foto_equipo}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="time-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Tiempo en el taller:</Text>
            </View>
            <Text style={styles.value}>{tiempo_taller}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="cash-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Costo de reparación:</Text>
            </View>
            <Text style={styles.value}>{costo_reparacion}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="time-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Tiempo para próximo servicio:</Text>
            </View>
            <Text style={styles.value}>{tiempo_proximo_servicio}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="alert-circle-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Estado del equipo:</Text>
            </View>
            <Text style={styles.value}>{estado_equipo}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="chatbubble-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Notas del cliente:</Text>
            </View>
            <Text style={styles.value}>{notas_cliente}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="document-text-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Comentarios internos:</Text>
            </View>
            <Text style={styles.value}>{comentarios_internos}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="hammer-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Razón de reparación:</Text>
            </View>
            <Text style={styles.value}>{razon_reparacion}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="chatbox-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Observaciones:</Text>
            </View>
            <Text style={styles.value}>{observaciones}</Text>

            <View style={styles.fieldContainer}>
              <Ionicons name="bulb-outline" size={24} color="#145498" />
              <Text style={styles.fieldSecondary}>Sugerencias:</Text>
            </View>
            <Text style={styles.value}>{sugerencias}</Text>

            {/* Agregar más campos aquí si es necesario */}

            <View style={styles.fieldContainer}>
              <TouchableOpacity onPress={handleShowMore} style={styles.button}>
                <Text style={styles.buttonText}>Ver menos</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldPrimary: {
    fontFamily: 'jakarta-bold',
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
  fieldSecondary: {
    fontFamily: 'jakarta-semi-bold',
    fontSize: 16,
    marginLeft: 5,
    color: '#777',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#145498',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExpedienteItem;
