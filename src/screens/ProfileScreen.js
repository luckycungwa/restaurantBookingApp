import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getAuth, signOut } from "@firebase/auth";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const authUser = useSelector((state) => state.auth.user);

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // After logout, navigate to default splash
      navigation.replace("SplashScreen");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleLogin = () => {
    
    // Navigate to Login screen
    navigation.replace("Login");
  };

  const handleRegistration = () => {
    // Navigate to Registration screen
    navigation.replace("Register");
  };

  useEffect(() => {
    // Fetch user details when the component mounts
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      // If user is logged in, fetch user details
      if (user) {
        // Dispatch action to update Redux state if needed
      } else {
        console.log("No user is signed in");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {authUser ? (
        // Render user profile if user is authenticated
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: authUser.photoURL || "default-profile-image-url" }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{authUser.displayName}</Text>
          <Text style={styles.userEmail}>{authUser.email}</Text>

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
        // Render login and registration buttons if no user is logged in
        <View style={styles.container}>
          <Text style={styles.noUserText}>
            No user logged in. Log in or create an account
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    marginVertical: 20,
  },
  profileContainer: {
    alignItems: "center",
    width: "80%",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
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
    color: "red",
    flex: 1,
    fontWeight: "bold",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    gap: 20,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#ffea2b",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  buttonText: {
    color: "#0f0f0f",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
