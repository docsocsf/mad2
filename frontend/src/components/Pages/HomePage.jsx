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
              Welcome to DoCSoc's Mums and Dads Portal!
            </p>
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    );
  }
}

export default HomePage;
