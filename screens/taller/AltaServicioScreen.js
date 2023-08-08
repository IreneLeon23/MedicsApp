import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { Provider as PaperProvider } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);
import axios from "axios";

const AltaServicioScreen = ({ navigation}) => {
  // Estados para cada paso del formulario
  //Step1
  const [folio, setFolio] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [telCliente, setTelCliente] = useState("");
  const [whatsCliente, setWhatsCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  //Step2
  const [showDropDown, setShowDropDown] = useState(false);
  const [estadoEquipo, setEstado] = useState("");
  const [falla, setFalla] = useState("");
  const [equipo, setEquipo] = useState("");
  const [fechaCaptura, setFechaCaptura] = useState("");
  const [fechaCompromiso, setfechaCompromiso] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  //Step3
  const [estatusOrden, setEstatusOrden] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [numSerie, setNumSerie] = useState("");
  const [showTiempoReparacionDropDown, setShowTiempoReparacionDropDown] =
    useState(false);
  const [tiempoReparacion, setTiempoReparacion] = useState("");
  const [showTipoReparacionDropDown, setShowTipoReparacionDropDown] =
    useState(false);
  const [tipoReparacion, setTipoReparacion] = useState("");
  const [showTipoMantenimientoDropDown, setShowTipoMantenimientoDropDown] =
    useState(false);
  const [tipoMantenimiento, setTipoMantenimiento] = useState("");
  const [costoFlete, setCostoFlete] = useState("");
  const [costoDiagnostico, setCostoDiagnostico] = useState("");

  //FK producto
  const [fkProducto, setFkProducto] = useState(null);

  const tiempoReparacionList = [
    {
      label: "1 Día",
      value: "1 Dia",
    },
    {
      label: "2 Días",
      value: "2 Dias",
    },
    {
      label: "3 Días",
      value: "3 Dias",
    },
    {
      label: "4 Días",
      value: "4 Dias",
    },
    {
      label: "5 Días",
      value: "5 Dias",
    },
    {
      label: "6 Días",
      value: "6 Dias",
    },
    {
      label: "1 Semana",
      value: "1 Semana",
    },
    {
      label: "2 Semanas",
      value: "2 Semanas",
    },
    {
      label: "3 Semanas",
      value: "3 Semanas",
    },
    {
      label: "4 Semanas",
      value: "4 Semanas",
    },
  ];
  const tipoReparacionList = [
    {
      label: "Particular",
      value: "Particular",
    },
    {
      label: "Hospitalaria",
      value: "Hospitalaria",
    },
  ];
  const tipoMantenimientoList = [
    {
      label: "Preventivo",
      value: "Preventivo",
    },
    {
      label: "Correctivo",
      value: "Correctivo",
    },
  ];
  // Función para obtener los productos desde el backend usando Axios
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://192.168.1.15:8080/products");
      // Filtrar solo el campo "nombre" de los productos
      const options = response.data.map((producto) => producto.nombre);
      setDropdownOptions(options);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };
  // Obtener el último folio utilizado en la tabla 'orden_cotizacion'
  useEffect(() => {
    axios
      .get("http://192.168.1.15:8080/workshop/ordenes/ultimoFolio")
      .then((response) => {
        // Sumar 1 al último folio para obtener el nuevo folio
        const newFolio = response.data + 1;
        setFolio(newFolio.toString());
      })
      .catch((error) => {
        console.error("Error al obtener el último folio:", error);
      });
  }, []);

  // Obtener el último idCliente utilizado en la tabla 'clientes'
  useEffect(() => {
    axios
      .get("http://192.168.1.15:8080/clientes/ultimoIdCliente")
      .then((response) => {
        // Sumar 1 al último idCliente para obtener el nuevo idCliente
        const newIdCliente = response.data + 1;
        setIdCliente(newIdCliente.toString());
      })
      .catch((error) => {
        console.error("Error al obtener el último ID Cliente:", error);
      });
  }, []);
  // Llama a la función fetchProductos cuando el componente se monte
  useEffect(() => {
    fetchProductos();
  }, []);
  // Función para establecer la fecha actual en fechaCaptura al cargar el formulario
  useEffect(() => {
    const currentDate = new Date(); // Obtener la fecha y hora actual
    setFechaCaptura(currentDate); // Establecer la fecha actual en el estado fechaCaptura
  }, []);
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

  const handleSubmit = () => {
    // Lógica para guardar los datos en la base de datos, etc.
    const formData = {
      //Datos del cliente
      idCliente,
      nombreCliente,
      telCliente,
      whatsCliente,
      emailCliente,
      direccionCliente,
      //Datos fase 2
      estadoEquipo,
      equipo,
      falla,
      fechaCaptura,
      fechaCompromiso,
      //Datos fase 3,
      estatusOrden,
      anticipo,
      marca,
      modelo,
      numSerie,
      tipoReparacion,
      tiempoReparacion,
      tipoMantenimiento,
      costoFlete,
      costoDiagnostico,
      fkProducto,

    };
    // Realizar la solicitud POST al backend para guardar los datos
    axios
      .post(`http://192.168.1.15:8080/orders`, formData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        // Puedes realizar alguna acción adicional aquí, como mostrar un mensaje de éxito, redirigir a otra pantalla, etc.
      })
      .catch((error) => {
        console.error("Error al guardar formulario:", error);
        // Manejo de errores
      });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#145498" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nueva Orden de Servicio</Text>
        </View>
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
          <View
            style={[
              styles.statusBarStep,
              currentStep === 3 && styles.statusBarStepActive,
            ]}
          />
        </View>
        {currentStep === 1 && (
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
                value={telCliente}
                onChangeText={setTelCliente}
                label={"Teléfono"}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              <View style={styles.inputSpacer}></View>
              {/* Whatsapp del Cliente */}
              <TextInput
                style={[styles.input, styles.rightInput]}
                value={whatsCliente}
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
        )}

        {currentStep === 2 && (
          <FormStep>
            {/* Equipo*/}
            <DropDown
              label={"Equipo"}
              mode="outlined"
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={equipo}
              setValue={setEquipo}
              list={dropdownOptions.map((option, index) => ({
                label: option,
                value: index,
              }))}
              activeColor="#145498" // Color activo del input
              dropDownItemTextStyle={{
                // Estilos del texto de cada opción
                fontFamily: "jakarta-regular", // Fuente del texto
                fontSize: 16, // Tamaño de fuente
                color: "#145498", // Color del texto
              }}
            />
            {/* Falla*/}
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input, { minHeight: 100 }]}
              value={falla}
              onChangeText={setFalla}
              label={"Falla"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
            {/* Estado*/}
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input, { minHeight: 100 }]}
              value={estadoEquipo}
              onChangeText={setEstado}
              label={"Estado del equipo"}
              mode="outlined"
              activeOutlineColor="#145498"
            />
            <View style={styles.dateInputContainer}>
              {/* Fecha probable de entrega */}
              <DatePickerInput
                locale="en-GB"
                label={"Fecha compromiso"}
                value={fechaCompromiso}
                onChange={(date) => setfechaCompromiso(date)}
                mode="outlined"
                activeOutlineColor="#145498"
              />
              {/* Fecha captura */}
              <DatePickerInput
                locale="en-GB"
                label={"Fecha captura"}
                value={fechaCaptura}
                onChange={(date) => setFechaCaptura(date)}
                mode="outlined"
                activeOutlineColor="#145498"
              />
            </View>
          </FormStep>
        )}

        {currentStep === 3 && (
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

          {currentStep < 3 && (
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handleNextStep}
            >
              <Text style={styles.navigationButtonText}>Siguiente</Text>
            </TouchableOpacity>
          )}

          {currentStep === 3 && (
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handleSubmit}
            >
              <Text style={styles.navigationButtonText}>Guardar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </PaperProvider>
  );
};

const FormStep = ({ children }) => {
  return <View style={styles.formStep}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "jakarta-medium",
    fontSize: 18,
    color: "#145498",
    marginLeft: 15,
  },
  // Estilos para el formulario multi-step
  formStep: {
    flex: 1,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  statusBarStep: {
    width: 100,
    height: 7,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  statusBarStepActive: {
    backgroundColor: "#145498",
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  leftInput: {
    flex: 1,
    marginRight: 1,
  },
  rightInput: {
    flex: 1,
    marginLeft: 10,
  },
  inputSpacer: {
    width: 1,
  },
  inputInline: {
    flex: 1,
    marginHorizontal: 2,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: "#145498",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  navigationButtonText: {
    color: "#fff",
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    textAlign: "center",
  },
  // Estilos para los campos del formulario
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  // Estilo para el contenedor de los inputs de fecha
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
export default AltaServicioScreen;
