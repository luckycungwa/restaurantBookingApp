const initialState = {
    // Manage theme or whatever (if needed)
    theme: 'light', 
};
  
  const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return {
          ...state,
          theme: state.theme === 'light' ? 'dark' : 'light',
        };
      // Add more cases based on your app's global state needs
  
      default:
        return state;
    }
  };
  
  export default appReducer;
  