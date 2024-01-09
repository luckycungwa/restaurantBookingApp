import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the BottomTabNavigator
import BottomTabNavigator from './BottomTabNavigator';

// MY NEAT SCREENS
import HomeScreen from '../screens/HomeScreen';
import ReservationHistory from '../screens/ReservationHistory';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
// import ShopList from '../components/ShopList';
import SuccessScreen from '../screens/SuccessScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <BottomTabNavigator>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="ReservationHistory" component={ReservationHistory}  />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          {/* <Stack.Screen name="ShopList" component={ShopList} /> */}
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        </Stack.Navigator>
      </BottomTabNavigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
