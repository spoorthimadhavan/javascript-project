import { STOREUSERDEATILS } from "./action";

const initialState = {
  user: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STOREUSERDEATILS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
