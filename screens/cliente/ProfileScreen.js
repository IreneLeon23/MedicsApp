import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import pfpImage from "../../assets/pfp.png";
import UsuarioContext from "../UserContext";
import axios from "axios";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://172.20.101.130:8080/profile/id=11}`
        );
        const userData = response.data;
        setName(userData.nombre);

        setEmail(userData.correo);
      } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
      }
    };

    fetchUserData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.mail}>{email}</Text>
      </View>
      <View style={styles.rentasCard}>
        <Icon
          name="credit-card"
          size={37}
          color="grey"
          style={styles.creditcard}
        />
        <Icon
          name="chevron-right"
          size={25}
          color="grey"
          style={styles.right}
        />
        <Text style={styles.CardTitle}>Mis rentas</Text>
      </View>
      <View style={styles.reparacionesCard}>
        <Icon name="tools" size={37} color="grey" style={styles.creditcard} />
        <Icon
          name="chevron-right"
          size={25}
          color="grey"
          style={styles.right}
        />
        <Text style={styles.CardTitle}>Mis reparaciones</Text>
      </View>
      <View style={styles.cuentaCard}>
        <Icon name="v-card" size={37} color="grey" style={styles.creditcard} />
        <Icon
          name="chevron-right"
          size={25}
          color="grey"
          style={styles.right}
        />
        <Text style={styles.CardTitle}>Cuenta</Text>
      </View>
      <Text></Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    backgroundColor: "#BF40BF	",
    height: 200,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    position: "absolute",
    top: 90,
    left: 40,
    right: 0,
    bottom: 0,
  },
  mail: {
    color: "white",
    fontSize: 15,
    position: "absolute",
    top: 123,
    left: 40,
    right: 0,
    bottom: 0,
  },
  pfp: {
    height: 80,
    width: 80,
    position: "absolute",
    top: 80,
    left: 250,
    right: 0,
    bottom: 0,
  },
  rentasCard: {
    height: 60,
    width: "95%",
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 7,
  },
  creditcard: {
    position: "absolute",
    top: 13,
    left: 17,
    right: 0,
    bottom: 0,
  },
  CardTitle: {
    fontSize: 19,
    color: "grey",
    fontWeight: "600",
    position: "absolute",
    top: 20,
    left: 90,
    right: 0,
    bottom: 0,
  },
  right: {
    position: "absolute",
    top: 20,
    left: "90%",
    right: 0,
    bottom: 0,
  },
  reparacionesCard: {
    height: 60,
    width: "95%",
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    marginBottom: 7,
  },
  cuentaCard: {
    height: 60,
    width: "95%",
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
  },
});
export default ProfileScreen;
