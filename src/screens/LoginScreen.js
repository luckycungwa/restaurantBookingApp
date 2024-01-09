import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, you can navigate to the desired screen
      navigation.replace('Home');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/img/logo light.png")}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
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
          onPress={handleLogin}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.subText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
      </View>
      

      {/* Error Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={handleCloseErrorModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseErrorModal}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 16,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  // Error Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#3d3d3d',
    borderRadius: 5,
    alignItems: 'center',
    height: "auto",
  },
});

export default LoginScreen;
