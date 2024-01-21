import { createStore, combineReducers } from 'redux';
import authReducer from './store/reducers/authReducer'; // Make sure to provide the correct path

const rootReducer = combineReducers({
  auth: authReducer,
  
});

const store = createStore(rootReducer);

export default store;