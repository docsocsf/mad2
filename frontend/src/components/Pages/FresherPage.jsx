import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import FresherSurveyComponent from "../Survey/FresherSurveyComponent";
import isLoggedIn from "../Auth/utils";
import Family from "./Family";

class FresherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn()
    };
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div>
        <h1
          style={{
            textAlign: "center"
          }}
        >
          Student survey
        </h1>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              {!loggedIn && <FresherSurveyComponent />}
              {loggedIn && Family}
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default FresherPage;
