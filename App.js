import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { UsuarioProvider } from "./screens/UserContext"; // Importa el proveedor de UsuarioContext

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OptionScreen from "./screens/OptionScreen";
//Pantallas para admin
import ClientAdminScreen from "./screens/administrador/ClientAdminScreen";
//Pantallas para cliente
import HomeScreen from "./screens/cliente/HomeScreen";
import ProfileScreen from "./screens/cliente/ProfileScreen";
import RentalScreen from "./screens/cliente/RentalScreen";
import RepairScreen from "./screens/cliente/RepairScreen";
//Pantallas para vendedor
import ProfileScreenVendedor from "./screens/vendedor/ProfileScreenVendedor";
//Componentes
import Menu from "./components/Menu";
import MenuVendedor from "./components/MenuVendedor";
import MenuTaller from "./components/Menu";
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
      // Aquí puedes agregar un código para manejar el caso en el que no se pase el campo "privilege" en onLogin
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
      <Tab.Screen
        name="Rentas"
        component={RentalScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Reparaciones"
        component={RepairScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
  const ClienteNavigator = () => (
    <Tab.Navigator tabBar={(props) => <Menu {...props} />}>
      <Tab.Screen
        name="ClientHome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
           {/* Pantallas sin uso ↓*/}
      <Tab.Screen
        name="Rentas"
        component={RentalScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Reparaciones"
        component={RepairScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
       {/* Pantallas sin uso */}
    </Tab.Navigator>
  );

  const VendedorNavigator = () => (
    <UsuarioProvider>
      <Tab.Navigator tabBar={(props) => <MenuVendedor {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Rentas"
          component={RentalScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Reparaciones"
          component={RepairScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreenVendedor}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </UsuarioProvider>
  );

  const TallerNavigator = () => (
    <UsuarioProvider>
      <Tab.Navigator tabBar={(props) => <MenuTaller {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Rentas"
          component={RentalScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Reparaciones"
          component={RepairScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </UsuarioProvider>
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
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Registro">
            {(props) => <RegisterScreen {...props} handleLogin={handleLogin} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <>
          {privilege === "cliente" && <ClienteNavigator />}
          {privilege === "vendedor" && <VendedorNavigator />}
          {privilege === "taller" && <TallerNavigator />}
          {privilege === "administrador" && <AdminNavigator />}
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
