// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RentalScreen from "./screens/RentalScreen";
import RepairScreen from "./screens/RepairScreen";
import Menu from "./components/Menu";


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Menu {...props} />}>
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
    </NavigationContainer>
  );
};

export default App;
