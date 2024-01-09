import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  // Combine your reducers here
  auth: authReducer,
});

export default rootReducer;
