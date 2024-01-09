const initialState = {
    // Define initial state for the data reducer
    restaurants: [], // Initialize an array to store restaurant data
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_RESTAURANT':
        return {
          ...state,
          restaurants: [...state.restaurants, action.payload],
        };
      // Add more cases 
  
      default:
        return state;
    }
  };
  
  export default dataReducer;
  