import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NuevoItem = ({ usuarios }) => {
  return (
    <View style={styles.card}>
      <Text>Clave usuario: {usuarios.clave_usuario}</Text>
      <Text>Nombre: {usuarios.nombre}</Text>
      <Text>Privilegio: {usuarios.privilegio}</Text>
      <Text>Descripción: {usuarios.correo}</Text>
      <Text>Horas de Trabajo: {usuarios.password}</Text>
      <Text>Importe: {usuarios.estatus}</Text>
      <Text>Dificultad: {usuarios.descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      fieldContainer: {
        flexDirection: "row",
        alignItems: "center",
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
      optionButton: {
        position: "absolute",
        top: 10,
        right: 5,
        padding: 1,
      },
      estadoContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      estadoText: {
        fontFamily: "jakarta-regular",
        fontSize: 16,
        marginLeft: 5,
      },
      estadoIcon: {
        marginRight: 1,
      },
      ordenEstado: {
        color: "#2B7AA5", // Estilo personalizado para el estado "Recibida"
      },
      trabajoEstado: {
        color: "orange", // Estilo personalizado para el estado "Trabajo"
      },
      finalizadaEstado: {
        color: "#952B8A", // Estilo personalizado para el estado "Finalizada"
      },
      entregadaEstado: {
        color: "green", // Estilo personalizado para el estado "Entregada"
      },
      defaultEstado: {
        color: "black", // Estilo por defecto cuando no hay coincidencia
      },
      fieldTel: {
        fontFamily: "jakarta-semi-bold",
        fontSize: 16,
        marginLeft: 1,
        marginEnd: 5,
        color: "#145498",
      },
      opaqueText: {
        opacity: 0.7,
      },
      fieldTerciaryAlt: {
        fontFamily: "jakarta-light",
        fontSize: 16,
        color: "#777",
        textAlign: "right",
      },
      cardContent: {
        flex: 1,
      },
      cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      },
      cardFooterButton: {
        flexDirection: "row",
        alignItems: "center",
      },
      cardFooterButtonText: {
        marginLeft: 5,
      },
});

export default NuevoItem;
