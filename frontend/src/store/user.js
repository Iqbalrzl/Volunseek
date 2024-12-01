// userReducer.js
const DEFAULT_STATE = {
  username: "",
  email: "",
  id: "",
  role: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        role: action.payload.role,
      };
    case "USER_LOGOUT":
      return DEFAULT_STATE;
    default:
      return state;
  }
};
