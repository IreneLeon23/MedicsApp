import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import FormStep from "../../components/ordersForm/FormStep";
import Step1 from "../../components/ordersForm/Step1";
import Step2 from "../../components/ordersForm/Step2";
import Step3 from "../../components/ordersForm/Step3";
import { styles } from "../../components/ordersForm/OrderStyles"; // Importa los estilos
registerTranslation("en-GB", enGB);
import axios from "axios";

const AltaServicioScreen = ({ navigation, route }) => {

  useEffect(() => {
    // Obtener el valor de idUsuario de route.params
    const { idUsuario } = route.params;
    console.log("Valor de idUsuario obtenido:", idUsuario);
    // Actualizar el estado usuario con el valor de idUsuario
    setUsuario(idUsuario);
  }, []);

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
  const [usuario, setUsuario] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [estadoEquipo, setEstado] = useState("");
  const [falla, setFalla] = useState("");
  const [equipo, setEquipo] = useState("");
  const [isNewEquipo, setIsNewEquipo] = useState(false);
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
      const response = await axios.get("http://192.168.1.10:8080/products");
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
      .get("http://192.168.1.10:8080/workshop/ordenes/ultimoFolio")
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
      .get("http://192.168.1.10:8080/clientes/ultimoIdCliente")
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
      .post(`http://192.168.1.10:8080/orders/NewOrden`, formData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        // Puedes realizar alguna acción adicional aquí, como mostrar un mensaje de éxito, redirigir a otra pantalla, etc.
      })
      .catch((error) => {
        console.error("Error al guardar formulario:", error);
        // Manejo de errores
      });
  };
  const handleShowDropDown = () => {
    console.log("handleShowDropDown called");
    setShowDropDown(!showDropDown);
    if (equipo === "nuevo") {
      setIsNewEquipo(true); // Cambiar isNewEquipo a true
    }
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
            <Step1
              folio={folio}
              idCliente={idCliente}
              nombreCliente={nombreCliente}
              direccionCliente={direccionCliente}
              telCliente={telCliente}
              whatsCliente={whatsCliente}
              emailCliente={emailCliente}
              setFolio={setFolio}
              setIdCliente={setIdCliente}
              setNombreCliente={setNombreCliente}
              setDireccionCliente={setDireccionCliente}
              setTelCliente={setTelCliente}
              setWhatsCliente={setWhatsCliente}
              setEmailCliente={setEmailCliente}
            />
          </FormStep>
        )}

        {currentStep === 2 && (
          <FormStep>
          <Step2
            usuario={usuario}
            equipo={equipo}
            isNewEquipo={isNewEquipo}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            setEquipo={setEquipo}
            estadoEquipo={estadoEquipo}
            falla={falla}
            setFalla={setFalla}
            setStateFunc={setEstado}
            fechaCaptura={fechaCaptura}
            fechaCompromiso={fechaCompromiso}
            dropdownOptions={dropdownOptions}
            tiempoReparacionList={tiempoReparacionList}
            setfechaCompromiso={setfechaCompromiso}
            setFechaCaptura={setFechaCaptura}
            setIsNewEquipo={setIsNewEquipo} // Asegúrate de incluir esta línea
          />
        </FormStep>
        )}
        {currentStep === 3 && (
          <FormStep>
            <Step3
              estatusOrden={estatusOrden}
              anticipo={anticipo}
              marca={marca}
              modelo={modelo}
              numSerie={numSerie}
              showTiempoReparacionDropDown={showTiempoReparacionDropDown}
              setShowTiempoReparacionDropDown={setShowTiempoReparacionDropDown}
              tiempoReparacion={tiempoReparacion}
              showTipoReparacionDropDown={showTipoReparacionDropDown}
              setShowTipoReparacionDropDown={setShowTipoReparacionDropDown}
              tipoReparacion={tipoReparacion}
              showTipoMantenimientoDropDown={showTipoMantenimientoDropDown}
              setShowTipoMantenimientoDropDown={
                setShowTipoMantenimientoDropDown
              }
              tipoMantenimiento={tipoMantenimiento}
              costoFlete={costoFlete}
              costoDiagnostico={costoDiagnostico}
              tipoReparacionList={tipoReparacionList}
              tiempoReparacionList={tiempoReparacionList}
              tipoMantenimientoList={tipoMantenimientoList}
              setEstatusOrden={setEstatusOrden}
              setAnticipo={setAnticipo}
              setMarca={setMarca}
              setModelo={setModelo}
              setNumSerie={setNumSerie}
              setTipoReparacion={setTipoReparacion}
              setTiempoReparacion={setTiempoReparacion}
              setTipoMantenimiento={setTipoMantenimiento}
              setCostoFlete={setCostoFlete}
              setCostoDiagnostico={setCostoDiagnostico}
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
export default AltaServicioScreen;
