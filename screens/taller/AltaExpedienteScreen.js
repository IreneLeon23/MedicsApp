import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { styles } from "../../components/ordersForm/OrderStyles";
import FormStep from "../../components/ordersForm/FormStep";
import { TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

const AltaExpedienteScreen = ({ route }) => {
  const { folio } = route.params;
  useEffect(() => {
    setFkServicio(folio.toString());
  }, [folio]);
  const [idExpediente, setIdExpediente] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fkServicio, setFkServicio] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [tiempoTaller, setTiempoTaller] = useState("");
  const [costoReparacion, setCostoReparacion] = useState("");
  const [tiempoProximoServicio, setTiempoProximoServicio] = useState("");
  const [notasCliente, setNotasCliente] = useState("");
  const [comentariosInternos, setComentariosInternos] = useState("");
  const [razonReparacion, setRazonReparacion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [sugerencias, setSugerencias] = useState("");

  const handleSubmit = async () => {
    try {
      const newExpediente = {
        id_expediente: idExpediente,
        fk_servicio: fkServicio,
        fk_cliente: fkCliente,
        fecha_entrada: fechaEntrega,
        fecha_entrega: fechaEntrega,
        tiempo_taller: tiempoTaller,
        costo_reparacion: costoReparacion,
        tiempo_proximo_servicio: tiempoProximoServicio,
        notas_cliente: notasCliente,
        comentarios_internos: comentariosInternos,
        razon_reparacion: razonReparacion,
        observaciones: observaciones,
        sugerencias: sugerencias,
      };

      const response = await axios.post(
        "http://192.168.1.10:8080/workshop/NewExpediente",
        newExpediente
      );

      if (response.status === 201) {
        // Lógica de éxito, mostrar mensaje o redireccionar
      } else {
        console.error(
          "Error al dar de alta el expediente:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al dar de alta el expediente:", error);
    }
  };

  // Control de navegación entre pasos
  const [currentStep, setCurrentStep] = useState(1);

  const handleGoBack = () => {
    navigation.goBack(); // Navegar a la pantalla anterior
  };
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alta de Expediente</Text>
      </View>

      {/* Multi-step form */}
      <View style={styles.formStep}>
        {/* Step status bar */}
        <View style={styles.statusBar}>
          <View
            style={[
              styles.statusBarStep,
              currentStep === 1 && styles.statusBarStepActive,
            ]}
          />
          <View
            style={[
              styles.statusBarStep,
              currentStep === 2 && styles.statusBarStepActive,
            ]}
          />
        </View>

        {currentStep === 1 && (
          <FormStep>
            <View style={styles.formRow}>
              <TextInput
                style={[styles.input, styles.leftInput]}
                value={idExpediente}
                label={"ID Expediente"}
                onChangeText={setIdExpediente}
                mode="outlined"
                activeOutlineColor="#145498"
                disabled={"true"}
              />
              <TextInput
                style={[styles.input, styles.rightInput]}
                value={fkServicio}
                label={"Folio de orden"}
                onChangeText={setFkServicio}
                mode="outlined"
                activeOutlineColor="#145498"
                disabled={"true"}
              />
            </View>
            <View style={styles.formRow}>
              <DatePickerInput
                locale="en-GB"
                label={"Fecha entrada"}
                value={fechaEntrada}
                onChange={(date) => setFechaEntrada(date)}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              <DatePickerInput
                locale="en-GB"
                label={"Fecha Entrega"}
                value={fechaEntrega}
                onChange={(date) => setFechaEntrega(date)}
                mode="outlined"
                activeOutlineColor="#145498"
              />
            </View>

            <TextInput
  style={styles.input}
  value={tiempoTaller.toString()} // Convertir a cadena
  label={"Tiempo en taller"}
  mode="outlined"
  activeOutlineColor="#145498"
/>
            <TextInput
              style={styles.input}
              value={costoReparacion}
              label={"Costo reparación"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
            <TextInput
              style={styles.input}
              value={tiempoProximoServicio.toString()}
              label={"Tiempo prox. servicio"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
          </FormStep>
        )}

        {currentStep === 2 && (
          <FormStep>
            <TextInput
              multiline
              style={[styles.input, { minHeight: 100 }]}
              value={notasCliente}
              onChangeText={setNotasCliente}
              label={"Notas al cliente"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
            <TextInput
              multiline
              style={[styles.input, { minHeight: 100 }]}
              value={observaciones}
              onChangeText={setObservaciones}
              label={"Observaciones"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
            <TextInput
              multiline
              style={[styles.input, { minHeight: 100 }]}
              value={sugerencias}
              onChangeText={setSugerencias}
              label={"Sugerencias"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
          </FormStep>
        )}

        {/* Navegación entre pasos */}
        <View style={styles.navigationContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handlePreviousStep}
            >
              <Text style={styles.navigationButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}

          {currentStep < 2 && (
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handleNextStep}
            >
              <Text style={styles.navigationButtonText}>Siguiente</Text>
            </TouchableOpacity>
          )}

          {currentStep === 2 && (
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handleSubmit}
            >
              <Text style={styles.navigationButtonText}>Guardar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AltaExpedienteScreen;
