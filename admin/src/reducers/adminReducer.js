export function adminReducer(state = JSON.parse(localStorage.getItem("admin")), action) {
    switch (action.type) { 
      case "LOGIN":
        return action.payload;
      case "LOGOUT":
        localStorage.setItem("admin",null)
        return null;
     
      default:
        return state;
    }
  }
  