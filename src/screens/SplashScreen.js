import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.replace("Register"); // Replace 'Home' with your main app screen
    console.log("clocked Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      <Image
        style={styles.image}
        source={require("../../assets/img/logo.png")}
      />

      <Text style={styles.subTitle}>
        Hi, welcome to your one way stop for your cravings
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text>SIGNIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>LOGIN</Text>
        </TouchableOpacity>
        {/* <Text style={styles.subText}>Already have an account? Login</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
backgroundColor: "#0d0d0d",
    paddingHorizontal: 10,
    gap: 30,
    // display: "flex",
    width: "100%",
    // height: "80%",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  image: {
    width: 300,
    height: 180,
    margin: 20,
    display: "",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 0.5,
    color: "white",
  },
  subTitle: {
    fontSize: 18,
    opacity: 0.6,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  subText: {
    fontSize: 10,
    opacity: 0.5,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  button: {
    display: "flex",
    backgroundColor: "#ffea2b",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    alignContent: "space-between",
    marginTop: 100,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  }
});

export default SplashScreen;
