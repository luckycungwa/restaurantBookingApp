import React, {useEffect, useState} from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/components/AppNavigator';

// import AppNavigator from './navigation/AppNavigator'; 

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
