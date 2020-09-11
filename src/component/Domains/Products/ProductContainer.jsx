import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchProducts, deleteProduct } from "../../../redux";
import NavBar from "../../Utils/NavBar/NavBar";
import TableList from "./TableList";
import TablePaging from "./TablePaging";
import ModalPostAndUpdate from "./ModalPostAndUpdate";

export const ProductContainer = (props) => {
  const [PostModal, setPostModal] = useState(false);

  return (
    <div>
      <NavBar />
      <h1>Product List</h1>
      {props.isLoading ? "Loading" : <TableList items={props.productData} deleteProd={props.deleteProduct} />}

      <TablePaging
        isLoading={props.isLoading}
        handleFetchGetAll={props.fetchProdutcs}
        totalProduct={props.totalProduct}
      />

      {!PostModal ? null : <ModalPostAndUpdate view={PostModal} toggleView={setPostModal} status={"Post"} />}
      <Button onClick={() => setPostModal(!PostModal)}>Post New</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.product.products,
    totalProduct: state.product.totalProduct,
    errorMsg: state.product.error,
    isLoading: state.product.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdutcs: (page, limit, searchKeyword, sort, status, orderby) => {
      dispatch(fetchProducts(page, limit, searchKeyword, sort, status, orderby));
    },
    deleteProduct: (id) => {
      dispatch(deleteProduct(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
