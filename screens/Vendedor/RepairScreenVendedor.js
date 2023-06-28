import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RepairScreenVendedor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Reparaciones</Text>
      <View style={styles.box}>
      <Text style={styles.BoxTitle}>Silla de ruedas</Text>
      <Text style={styles.BoxDate}>22/05/23</Text>
      <Text style={styles.BoxArrow}>Flecha</Text>
      </View>
      <View style={styles.box2}>
      <Text style={styles.BoxTitle}>Silla de ruedas</Text>
      <Text style={styles.BoxDate}>22/05/23</Text>
      <Text style={styles.BoxArrow}>Flecha</Text>
      </View>
      <View style={styles.box4}>
      <Text style={styles.BoxTitle}>Silla de ruedas</Text>
      <Text style={styles.BoxDate}>22/06/23</Text>
      <Text style={styles.BoxArrow}>Flecha</Text>
      </View>
      <View style={styles.box5}>
      <Text style={styles.BoxTitle}>Silla de ruedas</Text>
      <Text style={styles.BoxDate}>22/07/23</Text>
      <Text style={styles.BoxArrow}>Flecha</Text>
      </View>
      <View style={styles.box6}>
      <Text style={styles.BoxTitle}>Silla de ruedas</Text>
      <Text style={styles.BoxDate}>22/07/23</Text>
      <Text style={styles.BoxArrow}>Flecha</Text>
      </View>
      <View style={styles.RedPriority}/>
      <View style={styles.OrangePriority}/>
      <View style={styles.GreenPriority}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    
  },
  box:{
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6EBDFF',
    height: 162,
    width: 130,
    marginBottom: 325,
    marginLeft: 20,
    position: 'absolute',
    top: 68,
    left: 10,
    right: 0,
    bottom: 0,
  },
  box2:{
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6EBDFF',
    height: 162,
    width: 130,
    marginBottom: 325,
    marginLeft: 20,
    position: 'absolute',
    top: 68,
    left: 160,
    right: 0,
    bottom: 0,
  },
  box4:{
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6EBDFF',
    height: 162,
    width: 130,
    marginBottom: 325,
    marginLeft: 20,
    position: 'absolute',
    top: 240,
    left: 10,
    right: 0,
    bottom: 0,
  },
  box5:{
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6EBDFF',
    height: 162,
    width: 130,
    marginBottom: 325,
    marginLeft: 20,
    position: 'absolute',
    top: 410,
    left: 10,
    right: 0,
    bottom: 0,
  },
  box6:{
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6EBDFF',
    height: 162,
    width: 130,
    marginBottom: 325,
    marginLeft: 20,
    position: 'absolute',
    top: 410,
    left: 160,
    right: 0,
    bottom: 0,
  },
  RedPriority:{
    backgroundColor: 'red',
    height: 162,
    width: 20,
    position: 'absolute',
    top: 70,
    left: 345,
    right: 0,
    bottom: 0
  },
  OrangePriority:{
    backgroundColor: 'orange',
    height: 162,
    width: 20,
    position: 'absolute',
    top: 240,
    left: 345,
    right: 0,
    bottom: 0
  },
  GreenPriority:{
    backgroundColor: 'green',
    height: 162,
    width: 20,
    position: 'absolute',
    top: 410,
    left: 345,
    right: 0,
    bottom: 0
  },
  BoxTitle:{
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 4
  },
  BoxDate:{
    
    position: 'absolute',
    top: 135,
    left: 10,
    right: 0,
    bottom: 0
  },
  BoxArrow:{
    position: 'absolute',
    top: 135,
    left: 90,
    right: 0,
    bottom: 0
  },
  Title:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'grey',
    position: 'absolute',
    top: 31,
    left:30 ,
    right:0 ,
    bottom: 0,
  }
});
export default RepairScreenVendedor;
