import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import app from '../../firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // If registration is successful, you can navigate to the desired screen

      navigation.replace('WelcomeScreen');
    } catch (error) {
      console.error('Error creating user:', error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/img/logo light.png")}
      />
      <Text style={styles.title}>Create New Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name & Surname"
        value={names}
        onChangeText={(text) => setNames(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.subText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  image: {
    width: 200,
    height: 120,
    margin: 20,
    marginBottom: 10,
    top: 50,
    position: "absolute",
  },
  subText: {
    color: '#252525',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
