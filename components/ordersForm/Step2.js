import { React, useEffect} from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import FormStep from "./FormStep";
import {styles} from "./OrderStyles"; // Importa los estilos
import { DatePickerInput } from "react-native-paper-dates";
const Step2 = ({
  usuario,
  equipo,
  isNewEquipo,
  showDropDown,
  setShowDropDown,
  setEquipo,
  estadoEquipo,
  falla,
  setFalla,
  setStateFunc, 
  fechaCaptura,
  fechaCompromiso,
  dropdownOptions,
  tiempoReparacionList,
  setfechaCompromiso,
  setFechaCaptura,
  setIsNewEquipo, // Agrega esta prop
}) => {
  useEffect(() => {
    // Si el valor de equipo es "nuevo", actualiza isNewEquipo a true
    if (equipo === "nuevo") {
      setIsNewEquipo(true);
    } else {
      setIsNewEquipo(false);
    }
  }, [equipo, setIsNewEquipo]);

  console.log("Step2 - isNewEquipo:", isNewEquipo); // Agregar mensaje de depuración
  console.log("Step2 - equipo:", equipo); // Agregar mensaje de depuración
  console.log("Step2 - usuario:", usuario);
  return (
    
    <FormStep>
            {/* Mostrar el idUsuario en un TextInput */}
            <TextInput
              style={styles.input}
              value={usuario.toString()} // Usar el valor del usuario aquí
              label={"Usuario"}
              mode="outlined"
              activeOutlineColor="#145498"
              disabled // Desactivar la edición
            />
            {/* Equipo*/}
            <DropDown
              label={"Equipo"}
              mode="outlined"
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={equipo}
              setValue={setEquipo}
              list={[
                ...dropdownOptions.map((option, index) => ({
                  label: option,
                  value: index,
                })),
                { label: "Ingresar nuevo equipo", value: "nuevo" }, // Opción para ingresar nuevo equipo
              ]}
              activeColor="#145498"
              dropDownItemTextStyle={{
                fontFamily: "jakarta-regular",
                fontSize: 16,
                color: "#145498",
              }}
            />
            {isNewEquipo && equipo === "nuevo" && (
              <TextInput
                style={styles.input}
                value={equipo}
                onChangeText={setEquipo}
                label={"Nombre del equipo"}
                mode="outlined"
                activeOutlineColor="#145498"
              />
            )}
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
              onChangeText={setStateFunc}
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
  );
};

export default Step2;
