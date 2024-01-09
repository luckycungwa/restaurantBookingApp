import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from './firebaseConfig';

const db = getFirestore(app);

const addReservationToFirebase = async (reservationData) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), reservationData);
    console.log('Reservation added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding reservation: ', e);
    throw e;
  }
};

export default addReservationToFirebase;
