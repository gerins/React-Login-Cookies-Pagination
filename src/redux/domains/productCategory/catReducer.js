import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from "./catTypes";

const initialState = {
  loading: false,
  category: [],
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
        error: "",
      };

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        category: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
