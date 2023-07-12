import React from "react";
import { View, Text } from "react-native";

const ClientAdminScreen = ({}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>Menu para el Administrador!</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  text: {
    fontSize: 24,
    color: "#145498",
    fontWeight: "bold",
  },
};

export default ClientAdminScreen;
