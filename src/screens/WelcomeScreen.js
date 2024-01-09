import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a splash screen delay (you can replace this with your logic)
    const splashTimeout = setTimeout(() => {
      navigation.replace('Home'); // Replace 'Home' with your main app screen
    }, 3000); // 3000 milliseconds (3 seconds)

    return () => clearTimeout(splashTimeout); // Cleanup the timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      
      <Image style={styles.image} source={(require("../../assets/img/check-mark.png"))}/>
     
      <Text style={styles.subTitle}>Explore the best restaurants around you!</Text>
    </View>
  );
};

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default WelcomeScreen;

