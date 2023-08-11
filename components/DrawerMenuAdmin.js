import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import ClientAdminScreen from "./../screens/administrador/ClientAdminScreen";
import NuevoUsuario from "./../screens/administrador/NuevoUsuario"
import UsuariosScreen from './../screens/administrador/UsuariosScreen'


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
                  label === "Clientes"
                    ? "people"
                    : label === "Nuevo Usuario"
                    ? "person-add"
                    : label === "Usuarios"
                    ? "person-sharp"
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
      <Drawer.Screen
        name="Clientes"
        component={ClientAdminScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Alta Usuario"
        component={NuevoUsuario}
        options={{ headerShown: false }}
      />
        <Drawer.Screen
        name="Usuarios"
        component={UsuariosScreen}
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
