import Axios from "axios";
import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from "./catTypes";

const fetchCategoryRequest = () => ({
  type: FETCH_CATEGORY_REQUEST,
});

const fetchCategorySuccess = (category) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: category,
});

const fetchCategoryFailure = (error) => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: error,
});

export const fetchCategory = () => {
  const baseURL = "/categorymenus";
  return async (dispatch) => {
    dispatch(fetchCategoryRequest());
    try {
      const response = await Axios.get(baseURL);
      const category = response.data.Results;
      dispatch(fetchCategorySuccess(category));
    } catch (error) {
      const errorMsg = error.response;
      dispatch(fetchCategoryFailure(errorMsg));
    }
  };
};
