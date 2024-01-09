import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import MenuScreen from './MenuScreen';
import ReservationScreen from './ReservationScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

const FirstRoute = () => (
  <View style={styles.container}>
    <MenuScreen />
  </View>
);

const SecondRoute = () => (
  <View style={styles.container}>
    <ReservationScreen />
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const RestaurantScreen = ({}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Menu' },
    { key: 'second', title: 'Reservation' },
  ]);

  const { navigate } = useNavigation();
  const { params } = useRoute();
  const restaurantData = params?.restaurantData || {
    Name: 'Loading...',
    Time: 'Loading...',
    Rating: 'Loading...',
    Distance: 'Loading...',
    imageUrl: require('../../assets/img/resturant4.jpg'), // Default placeholder image
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View>
    <View>
      <View style={styles.imgContainer}>
        <Image source={restaurantData.imageUrl} style={styles.image} />
      </View>

      <View style={styles.ribbon}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{restaurantData.Name}    ({restaurantData.Distance})</Text>
          <Text style={styles.location}> {restaurantData.Time}</Text>
          
        </View>
        <View>
          <Image style={styles.icon} source={require('../../assets/img/liked.svg')} />
          <Text style={styles.rating}>{restaurantData.Rating}</Text>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
    </View>
  );
};
export default RestaurantScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    gap: 10,
    // display: "flex", 

  },
  scrollView_Horizontal: {
    display: "flex",
    width: "100%",
    height: "auto" ,
    flexDirection: "row",
    // backgroundColor: "blue",
    horizontalGap: 20,
    paddingVertical: 10,
  },
  scrollView_Vertical: {
    display: "flex",
    width: "100%",
    height: "auto" ,
    flexDirection: "column",
    backgroundColor: "#6c6cf4",
    gap: 10,
  },
  hGroup: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    gap : 20,
    flexDirection: "row",
  },
  location: {
    fontSize: 16,
    gap : 12,
    flexDirection: "row",
  },
  rating: {
    fontSize: 16,
    opacity: 0.6,
    gap : 6,
    
  },
  image: {
    width: "100%",
    height: "100%",
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    resizeMode: "cover",
    // position: "relative",
  },
  imgContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: 200,
    margin: 0,
},
  ribbon: {
    display: "flex",
    height: 64,
    width: "100%",
    backgroundColor: "#eeee00",
    // text inside
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 20,
  },
  ratingContainer: {
    display: "flex",
    // position: "absolute",
    alignItems: 'right',
    justifyContent: 'right',
    backgroundColor: "#3d3d3d",
    width: 30,
    height: 30,
    right : 10,
    
  },
  icon: {
    width: 24,
    height: 24,
    // margingRight: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  }
});


