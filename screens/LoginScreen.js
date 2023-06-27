import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ handleLogin, handleVendedor }) => {
  const handleEnterApp = () => {
    handleLogin();
  };

  const handleEnterVendedor = () => {
    handleVendedor();
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <TouchableOpacity style={styles.button} onPress={handleEnterApp}>
        <Text style={styles.buttonText}>Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEnterVendedor}>
        <Text style={styles.buttonText}>Vendedor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#145498',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
