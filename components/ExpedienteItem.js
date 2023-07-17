import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const ExpedienteItem = ({
  id,
  fechaEntrada,
  fechaEntrega,
  fkServicio,
  fkUsuario,
  direccion,
  fotoEquipo,
  tiempoTaller,
  costoReparacion,
  tiempoProximoServicio,
  estadoEquipo,
  descripcionEquipo,
  notasCliente,
  comentariosInternos,
  razonReparacion,
  observaciones,
  sugerencias,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.fieldContainerRow}>
          <Ionicons name="document-text-outline" size={24} color="#145498" />
          <Text style={styles.field}>ID Expediente:</Text>
        </View>
        <Text style={styles.value}>{id}</Text>

        <View style={styles.fieldContainerRow}>
          <Ionicons name="calendar-outline" size={24} color="#145498" />
          <Text style={styles.field}>Fecha de Entrada:</Text>
        </View>
        <Text style={styles.value}>{fechaEntrada}</Text>

        <View style={styles.fieldContainerRow}>
          <Ionicons name="calendar-outline" size={24} color="#145498" />
          <Text style={styles.field}>Fecha de Entrega:</Text>
        </View>
        <Text style={styles.value}>{fechaEntrega}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="cube-outline" size={24} color="#145498" />
          <Text style={styles.field}>ID Servicio:</Text>
        </View>
        <Text style={styles.value}>{fkServicio}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="person-outline" size={24} color="#145498" />
          <Text style={styles.field}>ID Usuario:</Text>
        </View>
        <Text style={styles.value}>{fkUsuario}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="location-outline" size={24} color="#145498" />
          <Text style={styles.field}>Dirección:</Text>
        </View>
        <Text style={styles.value}>{direccion}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="image-outline" size={24} color="#145498" />
          <Text style={styles.field}>Foto del Equipo:</Text>
        </View>
        <Text style={styles.value}>{fotoEquipo}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="time-outline" size={24} color="#145498" />
          <Text style={styles.field}>Tiempo en Taller:</Text>
        </View>
        <Text style={styles.value}>{tiempoTaller}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="cash-outline" size={24} color="#145498" />
          <Text style={styles.field}>Costo de Reparación:</Text>
        </View>
        <Text style={styles.value}>{costoReparacion}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="time-outline" size={24} color="#145498" />
          <Text style={styles.field}>Tiempo para Próximo Servicio:</Text>
        </View>
        <Text style={styles.value}>{tiempoProximoServicio}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="alert-circle-outline" size={24} color="#145498" />
          <Text style={styles.field}>Estado del Equipo:</Text>
        </View>
        <Text style={styles.value}>{estadoEquipo}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="clipboard-outline" size={24} color="#145498" />
          <Text style={styles.field}>Descripción del Equipo:</Text>
        </View>
        <Text style={styles.value}>{descripcionEquipo}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="chatbubble-outline" size={24} color="#145498" />
          <Text style={styles.field}>Notas del Cliente:</Text>
        </View>
        <Text style={styles.value}>{notasCliente}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="document-text-outline" size={24} color="#145498" />
          <Text style={styles.field}>Comentarios Internos:</Text>
        </View>
        <Text style={styles.value}>{comentariosInternos}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="hammer-outline" size={24} color="#145498" />
          <Text style={styles.field}>Razón de Reparación:</Text>
        </View>
        <Text style={styles.value}>{razonReparacion}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="chatbox-outline" size={24} color="#145498" />
          <Text style={styles.field}>Observaciones:</Text>
        </View>
        <Text style={styles.value}>{observaciones}</Text>

        <View style={styles.fieldContainer}>
          <Ionicons name="bulb-outline" size={24} color="#145498" />
          <Text style={styles.field}>Sugerencias:</Text>
        </View>
        <Text style={styles.value}>{sugerencias}</Text>
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
    flexDirection: "row",
    alignItems: "center",
  },
  fieldContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  field: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#37414d",
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ExpedienteItem;
