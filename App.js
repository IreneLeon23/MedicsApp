import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RentalScreen from "./screens/RentalScreen";
import RepairScreen from "./screens/RepairScreen";
import Menu from "./components/Menu";
import OptionScreen from "./screens/OptionScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Options"
            component={OptionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: true }}
          >
            {props => <LoginScreen {...props} handleLogin={handleLogin} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
};

export default App;
