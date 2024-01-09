import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null); // fetch user details after login

  useEffect(() => {
    // Fetch user details when the component mounts
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

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
      {user ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.photoURL || 'default-profile-image-url' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          {/* Additional user information */}
          <Text style={styles.userInfoText}>About</Text>
          <Text style={styles.userInfoText}>Privacy Center</Text>
          <Text style={styles.userInfoText}>Help</Text>
          <Text style={styles.userInfoText}>Restaurant Rewards</Text>
          <Text style={styles.userInfoText}>Settings</Text>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noUserText}>No user logged in. Log in of create account</Text>
      )}
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
  profileContainer: {
    alignItems: 'center',
    width: '80%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  noUserText: {
    fontSize: 16,
    color: 'red',
    flex: 1,
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
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
