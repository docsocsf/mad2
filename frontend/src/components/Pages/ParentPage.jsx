import React, { Component } from "react";
import ParentSurveyComponent from "../Survey/ParentSurveyComponent";
import { Col, Container, Row } from "reactstrap";

class ParentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ fontFamily: "Georgia" }}>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Open Sans"
          }}
        >
          Parent survey
        </h1>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              <ParentSurveyComponent />
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default ParentPage;
