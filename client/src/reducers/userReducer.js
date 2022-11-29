export function userReducer(state = JSON.stringify(localStorage.getItem("user")), action) {
    switch (action.type) { 
      case "LOGIN":
        return action.payload;
  
      default:
        return state;
    }
  }
  