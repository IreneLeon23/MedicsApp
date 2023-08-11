// components/FormStep.js
import React from "react";
import { View, StyleSheet } from "react-native";

const FormStep = ({ children }) => {
  return <View style={styles.formStep}>{children}</View>;
};

const styles = StyleSheet.create({
  formStep: {
    flex: 1,
  },
});

export default FormStep;
