import Axios from "axios";
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

const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: error,
});

export const fetchProducts = (page = 1, limit = 5, searchKeyword = "", sort = true, status = true, orderby = "id") => {
  const baseURL = "/menu";
  const queryParams = `${baseURL}?keyword=${searchKeyword}&page=${page * limit - limit}&limit=${limit}&status=${
    status ? "A" : "NA"
  }&orderBy=${orderby}&sort=${sort ? "ASC" : "DESC"}`;

  return async (dispatch) => {
    dispatch(fetchProductRequest());
    try {
      const response = await Axios.get(queryParams);
      const products = response.data.Results.menu;
      const totalProduct = response.data.Results.totalitem;
      dispatch(fetchProductSuccess({ totalProduct, products }));
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchProductFailure(errorMsg));
    }
  };
};

const deleteProductSuccess = (id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: id,
});

export const deleteProduct = (id) => {
  const baseURL = `/menu/${id}`;
  return async (dispatch) => {
    try {
      const response = await Axios.delete(baseURL);
      const productDeleted = response.data.Results.id;
      dispatch(deleteProductSuccess(productDeleted));
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

const postProductSuccess = (product) => ({
  type: POST_PRODUCT_SUCCESS,
  payload: product,
});

const postProductFailure = (error) => ({
  type: POST_PRODUCT_FAILURE,
  payload: error,
});

export const postProducts = (product, file) => {
  const baseURL = "/menu";
  var formData = new FormData();
  formData.append("file", file);
  formData.append("menuname", product.nama);
  formData.append("harga", product.harga);
  formData.append("stock", product.stock);
  formData.append("category", product.category);

  return async (dispatch) => {
    dispatch(fetchProductRequest());
    try {
      const response = await Axios.post(baseURL, formData);
      const products = response.data.Results;
      dispatch(postProductSuccess(products));
    } catch (error) {
      console.log(error.response.data);
      const errorMsg = error.message;
      dispatch(postProductFailure(errorMsg));
    }
  };
};

const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

const updateProductFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProducts = (product) => {
  const baseURL = `/menu/${product.id}`;
  return async (dispatch) => {
    dispatch(fetchProductRequest());
    try {
      const response = await Axios.put(baseURL, {
        menuname: product.nama,
        harga: +product.harga,
        stock: +product.stock,
        category: product.category,
      });
      console.log(response.data.Results);
      const products = response.data.Results;
      dispatch(updateProductSuccess(products));
    } catch (error) {
      console.log(error.response);
      const errorMsg = error.message;
      dispatch(updateProductFailure(errorMsg));
    }
  };
};
