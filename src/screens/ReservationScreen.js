import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import ModernDatePicker from 'react-native-modern-datepicker';
// FIREBASE STUFF
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
import addReservationToFirebase from '../../firebase.js/firestoreFunctions';
// Nav stuff
import { useNavigation } from "@react-navigation/native";

const ReservationScreen = () => {
  const [date, setDate] = useState(new Date());
  const [guests, setGuests] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const handleDateChange = (selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };

const handleReservation = async () => {
  try {
    // Handle reservation logic here
    console.log('Reservation details:', { date, guests, name, email });

    // Prepare reservation data
    const reservationData = {
      date: date.toISOString(), // Convert to ISO format for consistency
      guests: parseInt(guests), // Parse as integer
      name,
      email,
    };

    // Send data to Firebase
    const reservationId = await addReservationToFirebase(reservationData);

    console.log('Reservation added successfully with ID: ', reservationId);

    // Go to successScreen and send data to db
    navigation.navigate('SuccessScreen');
  } catch (error) {
    // Handle errors
    console.error('Error handling reservation: ', error);
  }
};

  return (
    <View style={styles.container}>
    <View style={styles.form}>
 <Text>RESTAURANT NAME</Text>
     

      <PaperInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <PaperInput
        label="Number of Guests"
        value={guests}
        onChangeText={(text) => setGuests(text)}
      />

      <PaperInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      
 <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <ModernDatePicker
          onSelectedChange={handleDateChange}
          selected={date}
          format="YYYY-MM-DD"
        />
      )}
      <Button title="Reserve Now" onPress={handleReservation} />
    </View>
     
    </View>
  );
};

export default ReservationScreen;


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    // justifyContent: "space-between",
    // paddingHorizontal: 10,
    gap: 10,
    display: "flex",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 300,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
  form:{
    flexDirection: "column",
    gap: 16,
    width: "100%",
    display: "flex",
    paddingHorizontal: 30,
    marginVertical: 20,
  },

});
