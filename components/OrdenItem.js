import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity  } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Font from "expo-font";

const OrdenItem = ({
  folio,
  nombre_producto,
  nombre_cliente,
  fecha_captura,
  descripcion,
}) => {
  useEffect(() => {
    const loadFonts = async () => {
      await Promise.all([
        Font.loadAsync({
          "jakarta-bold": require("../assets/fonts/Bold.ttf"),
        }),
        Font.loadAsync({
          "jakarta-medium": require("../assets/fonts/Medium.ttf"),
        }),
        Font.loadAsync({
          "jakarta-regular": require("../assets/fonts/Regular.ttf"),
        }),
        Font.loadAsync({
          "jakarta-light": require("../assets/fonts/Light.ttf"),
        }),
        Font.loadAsync({
          "jakarta-semi-bold": require("../assets/fonts/SemiBold.ttf"),
        }),
      ]);
    };

    loadFonts();
  }, []);

  return (
    <View style={styles.fatherContainer}>
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.fieldContainer}>
          {/* <Ionicons name="person-outline" size={24} color="#145498" /> */}
          <Text style={styles.fieldPrimary}>{nombre_producto}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldSecondary}>{fecha_captura}</Text>
          <Ionicons name="calendar-outline" size={16} color="#777" />
        </View>

        <View style={styles.fieldContainer}>
          {/* <Ionicons name="chatbubble-outline" size={24} color="#145498" /> */}
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.fieldTerciary}
          >
            {descripcion}
          </Text>
        </View>

        <View style={styles.fieldContainerAlt}>
          {/* <Ionicons name="chatbubble-outline" size={24} color="#145498" /> */}
          <Text style={[styles.fieldTerciaryAlt, styles.opaqueText]}>
            {nombre_cliente}
          </Text>
        </View>
      </Card.Content>
      <TouchableOpacity style={styles.optionButton}>
      <Ionicons name="open-outline" size={22} color="#145498" />
    </TouchableOpacity>
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  fatherContainer: {
    alignItems: "center",
  },
  card: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: '98%',
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldContainerAlt: {
    alignItems: "flex-end",
  },
  fieldPrimary: {
    fontFamily: "jakarta-bold",
    fontSize: 16,
    marginLeft: 5,
    color: "#333",
  },
  fieldSecondary: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    marginLeft: 5,
    color: "#777",
  },
  fieldTerciary: {
    fontFamily: "jakarta-regular",
    fontSize: 16,
    marginLeft: 5,
    color: "#777",
  },
  fieldTerciaryAlt: {
    fontFamily: "jakarta-light",
    fontSize: 16,
    color: "#777",
    textAlign: "right",
  },
  opaqueText: {
    opacity: 0.7,
  },
  optionButton: {
    position: "absolute",
    top: 10,
    right: 5,
    padding: 1,
  },
});

export default OrdenItem;
