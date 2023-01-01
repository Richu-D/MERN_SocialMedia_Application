export function userReducer(state = JSON.parse(localStorage.getItem("user")), action) {
    let newUserInfo;
    switch (action.type) { 
      case "LOGIN":
        return action.payload;
      case "LOGOUT":
        return null;
      case "VERIFY":
        return {
           ...state, verified: action.payload 
          };
      case "BLOCK":
        return {
            ...state, isBlocked: true
          };
      case "PRIVATE":
        return {
            ...state, isPrivate: true
          };
      case "SOCKET":
        return {
            ...state,socket:action.payload
          };
      case "PUBLIC":
        return {
            ...state, isPrivate: false
          };
      case "UpdateProfile":
        newUserInfo = JSON.parse(localStorage.getItem("user"))
        newUserInfo = {...newUserInfo, picture: action.payload }
        localStorage.setItem("user",JSON.stringify(newUserInfo))
        return {
            ...state, picture: action.payload 
          };
      case "UpdateCoverPic":
        newUserInfo = JSON.parse(localStorage.getItem("user"))
        newUserInfo = {...newUserInfo, cover: action.payload }
        localStorage.setItem("user",JSON.stringify(newUserInfo))
        return {
            ...state, cover: action.payload 
          };

      default:
        return state;
    }
  }
  