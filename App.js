// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { Provider } from "react-redux"; // Importar Provider de react-redux
import store from "./store"; // Importar la configuración del almacenamiento Redux

import LoginScreen from "./screens/LoginScreen";
import OptionScreen from "./screens/OptionScreen";
import ClientScreen from "./screens/administrador/ClientScreen";

import DrawerMenuTaller from "./components/DrawerMenuTaller";
import DrawerMenuAdmin from "./components/DrawerMenuAdmin";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [privilege, setPrivilege] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    if (data && data.privilege && data.idUsuario) {
      console.log(data);
      setPrivilege(data.privilege);
      setIdUsuario(data.idUsuario);
    } else {
      console.error("No se paso un argumento");
    }
  };

  return (
    <Provider store={store}>
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
                  onLogin={(privilege, idUsuario) =>
                    handleLogin(privilege, idUsuario)
                  }
                  options={{ headerShown: false }}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="Registro">
              {(props) => <RegisterScreen {...props} handleLogin={handleLogin} />}
            </Stack.Screen> */}
          </Stack.Navigator>
        ) : (
          <>
            {privilege === "taller" && (
              <DrawerMenuTaller idUsuario={idUsuario} />
            )}
            {privilege === "administrador" && <DrawerMenuAdmin />}
          </>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
