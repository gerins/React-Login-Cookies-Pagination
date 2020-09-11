import React, { Component, useState } from "react";
import { Form, Modal, NavDropdown, FormControl, Button } from "react-bootstrap";

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      modalViewRegister: false,
    };
  }

  toggleViewModalRegister = () => {
    this.setState({ modalViewRegister: !this.state.modalViewRegister });
  };

  inputValidation = () => {
    const { username, password } = this.state;
    this.props.handleUserLogin(username, password);
  };

  render() {
    const { username, password } = this.state;
    const { isLoading } = this.props.state;
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => this.setState({ username: event.target.value })}
            />
            <Form.Text className="text-muted">{this.props.state.loginMessage}</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => this.setState({ password: event.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" onClick={this.inputValidation} disabled={isLoading}>
            Login
          </Button>
          <Button variant="info" onClick={this.toggleViewModalRegister} disabled={isLoading}>
            Register
          </Button>
          <ModalRegister
            view={this.state.modalViewRegister}
            toggleModal={this.toggleViewModalRegister}
            handleUserRegister={this.props.handleUserRegister}
            registerMessage={this.props.state.registerMessage}
          />
        </Form>
      </div>
    );
  }
}

function ModalRegister(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <Modal
      show={props.view}
      onHide={props.toggleModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Register New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Input Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <p>{props.registerMessage}</p>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={togglePassword ? "text" : "password"}
              placeholder=" Input Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={() => setTogglePassword(!togglePassword)}>{togglePassword ? "Hide" : "Show"}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.handleUserRegister(username, password)}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginForm;
