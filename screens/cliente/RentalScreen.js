import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const RentalScreen = () => {
  const handleMoreClick = () => {
    console.log('Ver más');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Renta de equipo</Text>

      <View style={styles.box}>
      <ImageBackground
        source={require('../../assets/silladeruedas.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}>
        </ImageBackground>
        <View style={styles.overlay} />
        <Text style={styles.boxTitle}>Sillas de ruedas</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMoreClick}>
          <Text style={styles.moreText}>Ver más</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
      <ImageBackground
        source={require('../../assets/cama.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      ></ImageBackground>
      <View style={styles.overlay} />
        <Text style={styles.boxTitle}>Camas</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMoreClick}>
          <Text style={styles.moreText}>Ver más</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
      <ImageBackground
        source={require('../../assets/tanqueoxigeno.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      ></ImageBackground>
      <View style={styles.overlay} />
        <Text style={styles.boxTitle}>Tanques de oxígeno</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMoreClick}>
          <Text style={styles.moreText}>Ver más</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
      <ImageBackground
        source={require('../../assets/nebu.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      ></ImageBackground>
      <View style={styles.overlay} />
        <Text style={styles.boxTitle}>Neobulizadores</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMoreClick}>
          <Text style={styles.moreText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 25,
    paddingHorizontal: 1,
    
    
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'grey',
    textAlign: 'left'
    
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 1,
    marginBottom: 10,
    width: '92%',
    height: '18%',
    overflow: 'hidden', 
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    position: 'absolute',
    top: 75,
    left: 15,
    color: 'white'

  },
  moreButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    top: 65,
    left: 235
  },
  moreText: {
    color: 'black',
    fontSize: 14,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la tarjeta
    
  },
  imageStyle: {
    borderRadius: 5,
    position: 'absolute',
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 122, 255, 0.4)', // Fondo azul transparente
  },
});

export default RentalScreen;