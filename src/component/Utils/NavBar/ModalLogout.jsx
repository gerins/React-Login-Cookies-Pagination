import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalLogout = (props) => {
  return (
    <Modal show={props.view} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are You sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={props.logout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLogout;
