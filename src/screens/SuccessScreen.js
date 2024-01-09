import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONGRADUTIONS!</Text>
      
      <Image style={styles.image} source={(require("../../assets/img/check-mark.png"))}/>
     
      <Text style={styles.subTitle}>YOUR TABLE HAS BEEN SUCCESSFULLY RESERVATED!</Text>
      <Text style={styles.subText}>THANK YOU FOR CHOOSING US! Please check your email for more details</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text>Thank You!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      // justifyContent: "space-between",
      paddingHorizontal: 10,
      gap: 14,
      // display: "flex",
      width: "100%",
      
    },
    image: {
      width: 200,
      height: 200,
      margin: 20,
    },
     title: {
       fontSize: 24,
       fontWeight: 'bold',
       marginBottom: 20,
       letterSpacing: 0.5,
     },
     subTitle: {
       fontSize: 18,
       opacity: 0.6,
       marginBottom: 20,
       textAlign: "center",
     },
     subText: {
       fontSize: 10,
       opacity: 0.5,
       marginBottom: 20,
       textAlign: "center",
     },
     button: {
       backgroundColor: "#ffea2b",
       padding: 10,
       borderRadius: 5,
       fontWeight: "bold",
       alignItems: "center",
       width: "40%",
     },
  });
  