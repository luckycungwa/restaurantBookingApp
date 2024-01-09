import { createStore } from 'redux';
import rootReducer from './store/reducers'; // Ensure the correct path to your root reducer

const store = createStore(rootReducer);

export default store;
