export function userReducer(state = JSON.parse(localStorage.getItem("user")), action) {
    switch (action.type) { 
      case "LOGIN":
        return action.payload;
      case "LOGOUT":
        return null;
      case "VERIFY":
        return {
           ...state, verified: action.payload 
          };
      case "UpdateProfile":
        return {
            ...state, picture: action.payload 
          };
      default:
        return state;
    }
  }
  