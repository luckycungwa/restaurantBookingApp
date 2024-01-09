import React from 'react';
import { View, Text } from 'react-native';
import ShopList from '../components/ShopList';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <ShopList/>
    </View>
  );
};

export default HomeScreen;
