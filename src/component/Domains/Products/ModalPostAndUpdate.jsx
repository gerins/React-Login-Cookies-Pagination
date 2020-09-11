import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { fetchCategory, postProducts, updateProducts } from "../../../redux";

const ModalPostAndUpdate = (props) => {
  const [productID, setProductID] = useState();
  const [nama, setNama] = useState();
  const [harga, setHarga] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    if (props.status === "Update") {
      setProductID(props.item.id);
      setNama(props.item.menuname);
      setHarga(props.item.harga);
      setStock(props.item.stock);
    }
    props.fetchCategory();
  }, []);

  return (
    <Modal
      show={props.view}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={() => props.toggleView(!props.view)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.status} Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="inputFormProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Input Product Name"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
            />
            <p>{props.registerMessage}</p>
          </Form.Group>
          <Form.Group controlId="inputFormProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder=" Input Product Price"
              value={harga}
              onChange={(event) => setHarga(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="inputFormProductStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder=" Input Product Stock"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
              <option></option>
              {props.category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Select Product Image"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.toggleView(!props.view)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            props.status === "Update"
              ? props.updateProducts({
                  id: productID,
                  nama: nama,
                  harga: harga,
                  stock: stock,
                  category: category,
                })
              : props.postProducts(
                  {
                    nama: nama,
                    harga: harga,
                    stock: stock,
                    category: category,
                  },
                  imageFile
                )
          }
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    category: state.category.category,
    errorMsg: state.category.error,
    isLoading: state.category.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: () => {
      dispatch(fetchCategory());
    },
    postProducts: (product, file) => {
      dispatch(postProducts(product, file));
    },
    updateProducts: (product) => {
      dispatch(updateProducts(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPostAndUpdate);
