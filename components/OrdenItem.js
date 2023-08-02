import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

const OrdenItem = ({
  folio,
  nombre_producto,
  nombre_cliente,
  fecha_captura,
  fecha_compromiso,
  descripcion_producto,
  telefono_cliente,
  whats_cliente,
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
  const handlePhoneCall = () => {
    const phoneUrl = `tel:${telefono_cliente}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          console.log("La función de llamada no es compatible.");
        }
      })
      .catch((error) => {
        console.error("Error al abrir la marcación al teléfono:", error);
      });
  };
  const handleWhatsAppMessage = () => {
    const whatsAppUrl = `whatsapp://send?phone=${whats_cliente}`;
    Linking.canOpenURL(whatsAppUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsAppUrl);
        } else {
          console.log("La función de WhatsApp no es compatible.");
        }
      })
      .catch((error) => {
        console.error("Error al abrir WhatsApp:", error);
      });
  };

  return (
    <View style={styles.fatherContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldPrimary}>{nombre_producto} </Text>
            <MaterialCommunityIcons name="tag" size={20} color="#145498" />
            <Text style={styles.fieldPrimaryID}>{folio}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldSecondary}>{fecha_captura}</Text>
            <MaterialCommunityIcons
              name="calendar-import"
              size={16}
              color="#777"
            />
            <Text style={styles.fieldSecondary}>{fecha_compromiso}</Text>
            <MaterialCommunityIcons
              name="calendar-export"
              size={16}
              color="#777"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.fieldTerciary}
            >
              {descripcion_producto}
            </Text>
          </View>
          {/* Telefono */}
          <View style={styles.fieldContainer}>
            <TouchableOpacity
             style={styles.fieldContainer}
              onPress={handlePhoneCall}
            >
              <MaterialCommunityIcons name="phone" size={16} color="#145498" />
              <Text style={styles.fieldTel}>{telefono_cliente} </Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={styles.fieldContainer}
              onPress={handleWhatsAppMessage}
            >
              <MaterialCommunityIcons name="whatsapp" size={16} color="#145498" />
              <Text style={styles.fieldTel}>{whats_cliente}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainerAlt}>
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
    width: "98%",
    marginVertical: 10,
    shadowColor: "#171717",
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
  fieldPrimaryID: {
    fontFamily: "jakarta-bold",
    fontSize: 16,
    marginLeft: 1,
    color: "#145498",
  },
  fieldTel: {
    fontFamily: "jakarta-semi-bold",
    fontSize: 16,
    marginLeft: 1,
    color: "#145498",
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
