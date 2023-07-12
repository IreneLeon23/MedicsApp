import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const OrdenItem = ({
  id,
  fk_producto,
  fk_usuario,
  descripcion,
  fecha,
  costo_reparacion,
  estado,
  observaciones,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.fieldContainerRow}>
          <Ionicons name="document-text-outline" size={24} color="#145498" />
          <Text style={styles.field}>Id de Orden:</Text>
        </View>
        <Text style={styles.value}>{id}</Text>

        <View style={styles.fieldContainerRow}>
          <Ionicons name="cube-outline" size={24} color="#145498" />
          <Text style={styles.field}>ID Producto:</Text>
        </View>
        <Text style={styles.value}>{fk_producto}</Text>

        <View style={styles.fieldContainerRow}>
          <Ionicons name="person-outline" size={24} color="#145498" />
          <Text style={styles.field}>ID Usuario:</Text>
        </View>
        <Text style={styles.value}>{fk_usuario}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="clipboard-outline" size={24} color="#145498" />
          <Text style={styles.field}>Descripción:</Text>
        </View>
        <Text style={styles.value}>{descripcion}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="calendar-outline" size={24} color="#145498" />
          <Text style={styles.field}>Fecha:</Text>
        </View>
        <Text style={styles.value}>{fecha}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="cash-outline" size={24} color="#145498" />
          <Text style={styles.field}>Costo de Reparación:</Text>
        </View>
        <Text style={styles.value}>{costo_reparacion}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="alert-circle-outline" size={24} color="#145498" />
          <Text style={styles.field}>Estado:</Text>
        </View>
        <Text style={styles.value}>{estado}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="chatbubble-outline" size={24} color="#145498" />
          <Text style={styles.field}>Observaciones:</Text>
        </View>
        <Text style={styles.value}>{observaciones}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
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
  field: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#145498',
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default OrdenItem;
