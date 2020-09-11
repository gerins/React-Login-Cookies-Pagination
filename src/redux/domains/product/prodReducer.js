import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "./prodTypes";

const initialState = {
  loading: false,
  products: [],
  totalProduct: 0,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalProduct: action.payload.totalProduct,
        error: "",
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };

    case POST_PRODUCT_SUCCESS:
      state.products.unshift(action.payload);
      return {
        ...state,
        loading: false,
        products: state.products,
        error: "",
      };

    case POST_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        products: state.products,
        error: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      const newProduct = state.products.filter((product) => {
        return product.id != action.payload;
      });
      return {
        ...state,
        loading: false,
        products: newProduct,
        error: "",
      };

    case UPDATE_PRODUCT_SUCCESS:
      state.products.forEach((item, index) => {
        if (item.id === action.payload.id) {
          state.products[index] = action.payload;
          return;
        }
      });
      return {
        ...state,
        loading: false,
        products: state.products,
        error: "",
      };

    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        products: state.products,
        error: action.payload,
      };

    default:
      return state;
  }
};
