import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Title } from 'react-native-paper';

const RentalScreenVendedor = () => {
  const handleMoreClick = () => {
    console.log('Ver más');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Rentas</Text>
      <Text style={styles.Titles}>Expedientes</Text>

      <TouchableOpacity style={styles.Box}>
        <Text style={styles.Boxtitle}>Proximos a entregar</Text>
        <View style={styles.color} />
        <Ionicons name="ios-arrow-forward" size={24} color="black" style={styles.arrow}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Box}>
        <Text style={styles.Boxtitle}>Medio tiempo de renta</Text>
        <View style={styles.color2} />
        <Ionicons name="ios-arrow-forward" size={24} color="black" style={styles.arrow} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.Box}>
        <Text style={styles.Boxtitle}>Recientes</Text>
        <View style={styles.color3} />
        <Ionicons name="ios-arrow-forward" size={24} color="black" style={styles.arrow}/>
      </TouchableOpacity>

      
      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Nuevo expediente</Text>
      </TouchableOpacity>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
},
Title:{
  fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
    position: 'absolute',
    top: 30,
    left:30 ,
    right:0 ,
    bottom: 0,
},
Titles:{
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
  position: 'absolute',
  top: 75,
  left:25 ,
  right:0 ,
  bottom: 0,
},
Box:{
  height: 60,
  width: '95%',
  backgroundColor: '#D3D3D3',
  borderRadius: 5,
  marginTop: 50,
  marginBottom: 7
},
Boxtitle:{
  fontSize: 19,
    color: 'grey',
    fontWeight: '600',
    position: 'absolute',
    top: 20,
    left: 90,
    right: 0,
    bottom: 0,
},
arrow:{
  position:'absolute',
  top: 20,
  left: '90%',
  right: 0,
  bottom: 0,
},
color:{
  width: 20, height: 20, backgroundColor: 'red', marginRight: 10
},
color2:{
  width: 20, height: 20, backgroundColor: 'orange', marginRight: 10
},
color3:{
  width: 20, height: 20, backgroundColor: 'green', marginRight: 10
},
});
export default RentalScreenVendedor;