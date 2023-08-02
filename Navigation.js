import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const CustomHeader = () => {
  return null; // You can customize this component to your needs
};
const Tab = createBottomTabNavigator();

// const tabBarOptions = {
//   header: (props) => <CustomHeader {...props} />,
//   headerStyle: {
//     // Customize the header style here
//     backgroundColor: "#001",
//     height: "10px",
//     // ...other header style properties
//   },
//   headerTintColor: "#003",
//   headerTitleStyle: {
//     // Customize the text style of the header title
//     fontSize: "20",
//     // ...other header title style properties
//   },
// };
export default tabBarOptions;
