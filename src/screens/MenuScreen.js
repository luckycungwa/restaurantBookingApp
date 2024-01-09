import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const MenuScreen = () => {
  const [menuData, setMenuData] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Menu"));
        const menuItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMenuData(menuItems);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [db]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {menuData.map((dish) => (
        <View style={styles.card} key={dish.id}>
          <View>
            <Image style={styles.dishImage} source={dish.dishImage} />
          </View>

          <View style={styles.content}>
            <Text style={styles.dishName}>{dish.dishName}</Text>
            <Text style={styles.dishDescription}>{dish.dishDescription}</Text>
            <Text style={styles.dishPrice}>R {dish.dishPrice}</Text>
            <Text style={styles.dishRating}>{dish.dishRating}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    gap: 10,
    display: "flex",
  },
  card: {
    display: "flex",
    height: 150,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#e0e0e0ff",
    // overflow: "hidden",
    flexWrap: "wrap",
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    //  Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 12,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "fit",
    // position: "relative",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    // backgroundColor: "#3d3d3d",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "65%",
    // display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // left: "80%",
    right: 0,
    top: 0,
    position: "absolute",
    padding: 10,
    marginRight: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
  },
  bookmarkIcon: {
    padding: 10,
    // borderRadius: 50,
    width: 20,
    backgroundColor: "#3d3d3d",
    height: 20,
    zIndex: 1,
  },
  ingredients: {
    fontSize: 12,
    marginTop: 8,
  },
  time: {
    fontSize: 14,
    alignSelf: "flex-end",
    right: 0,
    paddingBottom: 4,
    float: "right",
    bottom: 0,
  },
  dishImage: {
    width: 90,
    height: 90,
    borderRadius: "100%",
    backgroundColor: "#8080807e",
    // position: 'absolute',
  },
  dishDescription: {
    fontSize: 12,
    fontWeight: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "wrap",
  },
  dishRating: {
    fontSize: 10,

    left: 235,
    bottom: -5,
    width: 20,
    height: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "wrap",
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MenuScreen;
