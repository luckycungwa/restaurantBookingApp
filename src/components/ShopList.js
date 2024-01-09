import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";

import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

const ShopList = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const db = getFirestore();
  const storage = getStorage(); // Initialize Firebase Storage to access images

  const [isBookmarked, setBookmarked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Restaurants"));
        const restaurantsData = querySnapshot.docs.map(async (doc) => {
          const restaurantData = {
            id: doc.id,
            ...doc.data(),
          };

          if (restaurantData.imageUrl) {
            // Convert gs:// URL to public URL (process is complex i must find better convertion method)
            const imageRef = ref(storage, restaurantData.imageUrl);
            // Handle errors cause yey!
            try {
              const imageUrl = await getDownloadURL(imageRef);
              restaurantData.imageUrl = imageUrl;
            } catch (error) {
              console.error("Error fetching image:", error);
              restaurantData.imageUrl = "default-image-url";
            }
            // display the image for god sake!
            const imageUrl = await getDownloadURL(imageRef);
            restaurantData.imageUrl = imageUrl;
          }

          return restaurantData;
        });

        // Resolve promises and set the state
        Promise.all(restaurantsData).then((resolvedData) => {
          setRestaurants(resolvedData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [db, storage]);

  if (loading) {
    return <ActivityIndicator size="medium" />;
  }

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      (!selectedCategory || restaurant.Category === selectedCategory) &&
      (!searchTerm ||
        restaurant.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.Address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewShop = (restaurantData) => {
    navigation.navigate("Restaurant", { restaurantData });
  };

  return (
    <ScrollView style={styles.vScroll}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <CategoryFilter
            categories={[
              "All",
              "Fast food",
              "Streetfood",
              "Seafood",
              "Desserts",
              "Italian",
            ]}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </View>
        <View>
          <SearchBar onSearch={handleSearch} />
        </View>

        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
            
              onPress={() => handleViewShop(item)}
              style={styles.cardContainer}
              key={item.id}
            >
              <View style={styles.card}>
                <Image
                  source={{
                    uri: item.imageUrl || "default-image-url",
                  }}
                  style={styles.image}
                />

                <View style={styles.content}>
                  <Text style={styles.title}>{item.Name}</Text>
                  <Text style={styles.location}>{item.Address}</Text>
                  <Text style={styles.rating}> {item.Rating}</Text>

                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}  //list in a single comlumn
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}    //create gap between cards since gap: 20 is not working on stylesheet
          showsVerticalScrollIndicator={false}    //hide scroll indicaator
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    gap: 20,
  },
  cardContainer: {
    alignItems: "center",
    width: "100%",
    gap: 20,
    backgroundColor: "#purple",
  },
  card: {
    display: "flex",
    borderRadius: 16,
    // backgroundColor: "#d06c6c",
    gap: 10,
    margingBottom: 20,
    width: "100%",
    height: 220,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
    position: "relative",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 12,
    marginTop: 8,
  },
  rating: {
    fontSize: 10,
    marginTop: 8,
    right: 20,
    bottom: 50,
    position: "absolute",
  },
  filterContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  vScroll: {
    flex: 1,
    backgroundColor: "#purple",
    gap: 10,
  },
  flatList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#purple",
    gap: 8,
  },
});

export default ShopList;
