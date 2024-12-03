const DEFAULT_STATE = {
  id: "",
  user: "",
  birth_date: "",
  address: "",
};

export const profileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "USER_ENROLLMENT":
      return {
        ...state,
        id: action.payload.id,
        user: action.payload.user,
        birth_date: action.payload.birth_date,
        address: action.payload.address,
      };
    default:
      return state;
  }
};
