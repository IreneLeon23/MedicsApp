import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import OrdenesServicioScreen from "./../screens/taller/OrdenesServicioScreen";
import ExpedientesScreen from "./../screens/taller/ExpedientesScreen";
import ReportesScreen from "./../screens/taller/ReportesScreen";
import CotizacionScreen from "./../screens/taller/CotizacionScreen";
import AltaServicioScreen from "./../screens/taller/AltaServicioScreen";
import TrabajosScreen from "./../screens/taller/TrabajosScreen"
import TrabajosGenScreen from "../screens/taller/TrabajosGenScreen";

const CustomDrawerContent = ({ state, descriptors, navigation }) => {
  return (
    <DrawerContentScrollView>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.drawerLabel !== undefined
            ? options.drawerLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <DrawerItem
            key={route.key}
            label={label}
            icon={({ color, size }) => (
              <Ionicons
                name={
                  label === "Ordenes"
                    ? "file-tray-full"
                    : label === "Expedientes"
                    ? "briefcase"
                    : label === "Alta Servicio"
                    ? "add-circle"
                    : label === "Cotizaciones"
                    ? "md-pricetag"
                    : label === "Reportes"
                    ? "stats-chart"
                    : label === "Alta Trabajos"
                    ? "clipboard"
                    : label === "Trabajos"
                    ? "hammer"
                    : "person"
                }
                size={size}
                color={color}
              />
            )}
            focused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

const DrawerMenuTaller = () => {
  const Drawer = createDrawerNavigator();
  const idUsuario = useSelector((state) => state.user.idUsuario); // Acceder al idUsuario desde Redux
console.log("idUsuario en drawer menu", idUsuario)
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={styles.drawer}
      overlayColor="transparent"
      screenOptions={{
        activeTintColor: "#145498",
        inactiveTintColor: "#8492A6",
        itemStyle: styles.drawerItem,
        labelStyle: styles.drawerLabel,
      }}
    >
      {/* Define aquí las pantallas y sus componentes */}

      <Drawer.Screen
        name="Ordenes"
        component={OrdenesServicioScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Expedientes"
        component={ExpedientesScreen}
        options={{ headerShown: false }}
      />
        <Drawer.Screen
        name="Trabajos"
        component={TrabajosGenScreen}
        options={{ headerShown: false }}
      />
      {/* Resto de las pantallas */}
      <Drawer.Screen
        name="Alta Servicio"
        initialParams={{idUsuario}}
        component={AltaServicioScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen 
       name="Alta Trabajos"
       component={TrabajosScreen}
       options={{ headerShown: false }}>

      </Drawer.Screen>
      <Drawer.Screen
        name="Cotizaciones"
        component={CotizacionScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Reportes"
        component={ReportesScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const styles = {
  drawer: {
    width: "70%",
  },
  drawerItem: {
    justifyContent: "center",
    paddingVertical: 16,
  },
  drawerLabel: {
    fontSize: 16,
  },
};

export default DrawerMenuTaller;
