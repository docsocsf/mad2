import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

class HomePage extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={2} />
          <Col sm={8}>
            <h1
              style={{
                textAlign: "center"
              }}
            >
              About Mums and Dads
            </h1>
            <p style={{ textAlign: "center" }}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    );
  }
}

export default HomePage;
