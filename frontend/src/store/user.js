// userReducer.js
const DEFAULT_STATE = {
  username: "",
  email: "",
  id: "",
  role: "",
  first_name: "",
  last_name: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        first_name: action.payload.first_name, // Menambahkan first_name
        last_name: action.payload.last_name, // Menambahkan last_name
      };
    case "USER_UPDATE":
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
      };
    case "USER_LOGOUT":
      return DEFAULT_STATE;
    default:
      return state;
  }
};
