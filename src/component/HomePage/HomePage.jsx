import React, { Component } from "react";
import NavBar from "../Utils/NavBar/NavBar";
import { Button, Jumbotron } from "react-bootstrap";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured
            content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default HomePage;
