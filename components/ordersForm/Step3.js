// components/Step3.js
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import FormStep from "./FormStep";
import {styles} from "./OrderStyles"; // Importa los estilos
const Step3 = ({
  estatusOrden,
  anticipo,
  marca,
  modelo,
  numSerie,
  showTiempoReparacionDropDown,
  setShowTiempoReparacionDropDown,
  tiempoReparacion,
  showTipoReparacionDropDown,
  setShowTipoReparacionDropDown,
  tipoReparacion,
  showTipoMantenimientoDropDown,
  setShowTipoMantenimientoDropDown,
  tipoMantenimiento,
  costoFlete,
  costoDiagnostico,
  tipoReparacionList,
  tiempoReparacionList,
  tipoMantenimientoList,
  setEstatusOrden,
  setAnticipo,
  setMarca,
  setModelo,
  setNumSerie,
  setTiempoReparacion,
  setTipoReparacion,
  setTipoMantenimiento,
  setCostoFlete,
  setCostoDiagnostico,
}) => {
  return (
    <FormStep>
            <View style={styles.formRow}>
              <TextInput
                style={[styles.input, styles.leftInput]}
                value={estatusOrden}
                label={"Estatus orden"}
                onChangeText={setEstatusOrden}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              <View style={styles.inputSpacer} />
              <TextInput
                style={[styles.input, styles.rightInput]}
                value={anticipo}
                label={"Anticipo"}
                onChangeText={setAnticipo}
                mode="outlined"
                activeOutlineColor="#145498"
              />
            </View>
            <View style={styles.formRow}>
              <TextInput
                style={[styles.input, styles.inputInline]}
                value={marca}
                label={"Marca"}
                onChangeText={setMarca}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              <TextInput
                style={[styles.input, styles.inputInline]}
                value={modelo}
                label={"Modelo"}
                onChangeText={setModelo}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              <TextInput
                style={[styles.input, styles.inputInline]}
                value={numSerie}
                label={"No. serie"}
                onChangeText={setNumSerie}
                mode="outlined"
                activeOutlineColor="#145498"
              />
            </View>
            <View style={styles.formRow}>
              {/* Dropdown para tiempoReparacion */}
              <DropDown
                label={"Tiempo de Reparación"}
                mode={"outlined"}
                visible={showTiempoReparacionDropDown}
                showDropDown={() => setShowTiempoReparacionDropDown(true)}
                onDismiss={() => setShowTiempoReparacionDropDown(false)}
                value={tiempoReparacion}
                setValue={setTiempoReparacion}
                list={tiempoReparacionList}
                dropDownContainerMaxHeight={150} // Ajusta la altura máxima del dropdown
              />

              {/* Dropdown para tipoReparacion */}
              <DropDown
                label={"Tipo de Reparación"}
                mode={"outlined"}
                visible={showTipoReparacionDropDown}
                showDropDown={() => setShowTipoReparacionDropDown(true)}
                onDismiss={() => setShowTipoReparacionDropDown(false)}
                value={tipoReparacion}
                setValue={setTipoReparacion}
                list={tipoReparacionList}
                dropDownContainerMaxHeight={150} // Ajusta la altura máxima del dropdown
              />

              {/* Dropdown para tipoMantenimiento */}
              <DropDown
                label={"Tipo de Mantenimiento"}
                mode={"outlined"}
                visible={showTipoMantenimientoDropDown}
                showDropDown={() => setShowTipoMantenimientoDropDown(true)}
                onDismiss={() => setShowTipoMantenimientoDropDown(false)}
                value={tipoMantenimiento}
                setValue={setTipoMantenimiento}
                list={tipoMantenimientoList}
                dropDownContainerMaxHeight={150} // Ajusta la altura máxima del dropdown
              />
            </View>
            <View style={styles.formRow}>
              <TextInput
                style={[styles.input, styles.leftInput]}
                value={costoFlete}
                label={"Costo flete"}
                onChangeText={setCostoFlete}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              <View style={styles.inputSpacer} />
              <TextInput
                style={[styles.input, styles.rightInput]}
                value={costoDiagnostico}
                label={"Costo diagnostico"}
                onChangeText={setCostoDiagnostico}
                mode="outlined"
                activeOutlineColor="#145498"
              />
            </View>
          </FormStep>
  );
};

export default Step3;
