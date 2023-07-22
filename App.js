import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";


import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OptionScreen from "./screens/OptionScreen";
import ClientAdminScreen from "./screens/administrador/ClientAdminScreen";
import OrdenesServicioScreen from "./screens/taller/OrdenesServicioScreen";
import ExpedientesScreen from "./screens/taller/ExpedientesScreen";
import ReportesScreen from "./screens/taller/ReportesScreen";
import CotizacionScreen from "./screens/taller/CotizacionScreen";
import MenuTaller from "./components/MenuTaller";
import MenuAdmin from "./components/MenuAdmin";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [privilege, setPrivilege] = useState(null);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    if (data && data.privilege) {
      setPrivilege(data.privilege);
      console.log("Valor del data.privilege: ", data.privilege);
    } else {
      console.error(
        "El campo 'privilege' no se ha pasado en la función onLogin"
      );
    }
  };

  const AdminNavigator = () => (
    <Tab.Navigator tabBar={(props) => <MenuAdmin {...props} />}>
      <Tab.Screen
        name="Administrar"
        component={ClientAdminScreen}
        options={{ headerShown: false }}
      />
      {/* Resto de las pantallas */}
    </Tab.Navigator>
  );

  const TallerNavigator = () => (
    <Tab.Navigator tabBar={(props) => <MenuTaller {...props} />}>
      <Tab.Screen
        name="Ordenes"
        component={OrdenesServicioScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Expedientes"
        component={ExpedientesScreen}
        options={{ headerShown: false }}
      />
      {/* Resto de las pantallas */}
      <Tab.Screen
        name="Cotizaciones"
        component={CotizacionScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Reportes"
        component={ReportesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
    
        {!isLoggedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Options"
              component={OptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" options={{ headerShown: true }}>
              {(props) => (
                <LoginScreen
                  {...props}
                  onLogin={(privilege) => handleLogin(privilege)}
                  options={{ headerShown: false }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Registro">
              {(props) => (
                <RegisterScreen {...props} handleLogin={handleLogin} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <>
            {privilege === "taller" && <TallerNavigator />}
            {privilege === "administrador" && <AdminNavigator />}
          </>
        )}
  
    </NavigationContainer>
  );
};

export default App;
