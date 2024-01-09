import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';

const ReservationHistory = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Assuming 'Reservations' is the collection name in the database
        const reservationsQuery = query(collection(db, 'Reservations'), where('userId', '==', 'currentUserId'));

        const querySnapshot = await getDocs(reservationsQuery);
        const reservationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReservations(reservationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [db]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} size="small" color="#ffdf29" />
  }

  return (
    <View style={styles.container}>
      {reservations.length === 0 ? (
        <Text style={styles.warningText}>No reservations yet</Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
              <Text style={styles.reservationTitle}>{item.Name}</Text>
              <Text style={styles.reservationDetails}>Date: {item.date}</Text>
              <Text style={styles.reservationDetails}>Time: {item.time}</Text>
              {/* Add more reservation details as needed */}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  reservationItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reservationDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  warningText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    
  }
});

export default ReservationHistory;
