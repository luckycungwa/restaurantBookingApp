import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null); // fetch user details after login

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // After logout, navigate to default splash
      navigation.replace('SplashScreen');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Name: {user.displayName}</Text>
          <Text style={styles.userInfoText}>Email: {user.email}</Text>
          {/* You can display additional user information here */}
        </View>
      ) : (
        <Text style={styles.noUserText}>No user logged in</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  userInfoContainer: {
    width: '80%',
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  noUserText: {
    fontSize: 16,
    color: 'red',
  },
  button: {
    backgroundColor: '#ffea2b',
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
