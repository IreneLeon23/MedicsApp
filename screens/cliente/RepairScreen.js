import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const RepairScreen = () => {
  const [date, setDate] = useState(new Date());
  

  const getSemaforoColor = (date) => {
    const now = new Date();
    const diff = date - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 2) {
      return "red";
    } else if (days <= 5) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Reparaciones</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Muletas</Title>
          <Paragraph>Descripción de las muletas...</Paragraph>
          <Paragraph
            style={[styles.semaforo, { color: getSemaforoColor(date) }]}
          >
            *
          </Paragraph>
          <Paragraph>{date.toDateString()}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.moreButton}>Ver más</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    paddingHorizontal: 1,
  },
  title: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "grey",
    textAlign: "left",
  },
  card: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 1,
    marginBottom: 10,
    width: "92%",
    height: "25%",
    overflow: "hidden",
  },
  semaforo: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 24, // Ajusta el tamaño del asterisco aquí
  },
  moreButton: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    padding: 5,
    position: "absolute",
    top: 4,
    left: 200,
  },
});

export default RepairScreen;
