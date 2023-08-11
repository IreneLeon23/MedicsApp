import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import FormStep from "./FormStep";
import {styles} from "./OrderStyles"; // Importa los estilos

const Step1 = ({
  folio,
  idCliente,
  nombreCliente,
  direccionCliente,
  telCliente,
  whatsCliente,
  emailCliente,
  setFolio,
  setIdCliente,
  setNombreCliente,
  setDireccionCliente,
  setTelCliente,
  setWhatsCliente,
  setEmailCliente,
}) => {
  return (
    <FormStep>
    <View style={styles.formRow}>
      {/* Folio */}
      <TextInput
        style={[styles.input, styles.leftInput]}
        value={folio}
        label={"Folio"}
        onChangeText={setFolio}
        mode="outlined"
        activeOutlineColor="#145498"
        disabled={"true"}
      />

      {/* Espacio entre los campos */}
      <View style={styles.inputSpacer} />

      {/* ID Cliente */}
      <TextInput
        style={[styles.input, styles.rightInput]}
        value={idCliente}
        label={"ID Cliente"}
        onChangeText={setIdCliente}
        mode="outlined"
        activeOutlineColor="#145498"
        disabled={"true"}
      />
    </View>

    {/* Nombre del Cliente */}
    <TextInput
      style={styles.input}
      value={nombreCliente}
      onChangeText={setNombreCliente}
      label={"Nombre"}
      mode="outlined"
      activeOutlineColor="#145498"
    />
    {/* Direccion del Cliente */}
    <TextInput
      style={styles.input}
      value={direccionCliente}
      onChangeText={setDireccionCliente}
      label={"Direccion"}
      mode="outlined"
      activeOutlineColor="#145498"
    />
    <View style={styles.formRow}>
      {/* Telefono del Cliente */}
      <TextInput
        style={[styles.input, styles.leftInput]}
        value={telCliente.toString()}
        keyboardType="numeric"
        onChangeText={setTelCliente}
        label={"Teléfono"}
        mode="outlined"
        activeOutlineColor="#145498"
      />
      <View style={styles.inputSpacer}></View>
      {/* Whatsapp del Cliente */}
      <TextInput
        style={[styles.input, styles.rightInput]}
        value={whatsCliente.toString()}
        keyboardType="numeric"
        onChangeText={setWhatsCliente}
        label={"Whatsapp"}
        mode="outlined"
        activeOutlineColor="#145498"
      />
    </View>
    {/* Email del Cliente */}
    <TextInput
      style={styles.input}
      value={emailCliente}
      onChangeText={setEmailCliente}
      label={"Email"}
      mode="outlined"
      activeOutlineColor="#145498"
    />
  </FormStep>
  );
};

export default Step1;
