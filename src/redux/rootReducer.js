import { combineReducers } from "redux";
import productReducer from "./domains/product/prodReducer";
import catReducer from "./domains/productCategory/catReducer";

const rootReducer = combineReducers({
  product: productReducer,
  category: catReducer,
});

export default rootReducer;
