import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import auth from "../RouteValidation/Auth";
import ModalLogout from "./ModalLogout";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalViewLogout: false,
    };
  }

  toggleViewModalLogout = () => {
    this.setState({ modalViewLogout: !this.state.modalViewLogout });
  };

  handleUserLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    auth.logout(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        <ModalLogout
          view={this.state.modalViewLogout}
          toggleModal={this.toggleViewModalLogout}
          logout={this.handleUserLogout}
        />
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>Shop & Steal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/product">Products</Link>
              </Nav.Link>
              <NavDropdown title={Cookies.get("user")} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.toggleViewModalLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-3" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
