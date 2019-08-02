import React, { Component } from "react";
import SurveyComponent from "../SurveyComponent";
import { Col, Container, Row } from "reactstrap";

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ fontFamily: "Georgia" }}>
        <h1 style={{ textAlign: "center" }}>Student survey</h1>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              <SurveyComponent />
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default StudentPage;
